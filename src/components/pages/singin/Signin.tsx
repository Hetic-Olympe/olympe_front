import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import image from "@/assets/images/illustration.avif"
import AuthForm from "@/components/authForm/AuthForm";

type FormErrors = Record<string, { message?: string }>;

type FormValues = {
    email: string;
    password: string;
};

const formSchema = z.object({
    email: z.string().email({
        message: "Email must be a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

export default function Signin() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { isAuthenticated, role, signIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (!isAuthenticated) return;
        navigate("/profile");
    }, [isAuthenticated, role, navigate]);

    const onError = useCallback((errors: FormErrors) => {
        Object.values(errors).forEach(error => {
            toast({
                variant: "destructive",
                title: "Form submission failed",
                description: error.message,
            });
        });
    }, [toast]);

    const onSubmit = useCallback(async (values: FormValues) => {
        setIsLoading(true);
        await fetch('http://localhost:5001/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(async res => {
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error);
            }
            const data = await res.json();
            console.log("data", data);

            signIn(values.email, 'user', data.token);

            toast({
                title: "Sign in successful",
                description: `Welcome back, ${values.email}!`,
            });
        }).catch(err => {
            console.error("err", err);
            toast({
                variant: "destructive",
                title: "Sign in failed",
                description: `Error: ${err.message}`,
            });
        }).finally(() => setIsLoading(false));
    }, [signIn, toast]);

    return (
        <AuthForm<FormValues>
            title="Sign In"
            description="Enter your email and password to sign in"
            fields={[
                {
                    label: "Email",
                    type: "email",
                    id: "email",
                    placeholder: "johndoe@gmail.com",
                    name: "email"
                },
                {
                    label: "Password",
                    type: "password",
                    id: "password",
                    placeholder: "",
                    name: "password"
                }
            ]}
            form={form}
            onSubmit={onSubmit}
            onError={onError}
            isLoading={isLoading}
            image={image}
            buttonText="Sign In"
            redirectText="Don't have an account? "
            redirectButton="Sign up"
            redirectLink="/signup"
        />
    );
}