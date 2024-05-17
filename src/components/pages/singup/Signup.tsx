import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import image from "@/assets/images/illustration2.jpg";
import AuthForm from "@/components/authForm/AuthForm";
import useFetch from "@/hooks/useFetch";

type FormErrors = Record<string, { message?: string }>;

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

const formSchema = z.object({
    email: z.string().email({
        message: "Email must be a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ['confirmPassword']
});

export default function SignUp() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { fetchData: fetchSignUp, isLoading } = useFetch('/users/signup');


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

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
        try {
            await fetchSignUp({
                method: 'POST',
                body: JSON.stringify(values),
            });
            toast({
                title: "Sign up successful",
                description: `Welcome, ${values.email}!`,
            });
            navigate("/signin");
        } catch (error) {
            console.error("err", error);
            toast({
                variant: "destructive",
                title: "Sign up failed",
                description: `Error: ${(error as Error).message}`,
            });
        }
    }, [navigate, toast, fetchSignUp]);

    return (
        <AuthForm<FormValues>
            title="Sign Up"
            description="Enter your details to create a new account"
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
                },
                {
                    label: "Confirm Password",
                    type: "password",
                    id: "confirmPassword",
                    placeholder: "",
                    name: "confirmPassword"
                }
            ]}
            form={form}
            onSubmit={onSubmit}
            onError={onError}
            isLoading={isLoading}
            image={image}
            buttonText="Sign Up"
            redirectText="Already have an account? "
            redirectButton="Sign In"
            redirectLink="/signin"
            reverseGrid={true}
        />
    );
}