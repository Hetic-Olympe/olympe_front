import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"
import { useAuth } from "@/contexts/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast";
import image from "@/assets/images/illustration.avif"

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

    function onError(errors: FormErrors) {
        Object.values(errors).forEach(error => {
            toast({
                variant: "destructive",
                title: "Form submission failed",
                description: error.message,
            });
        });
    }

    async function onSubmit(values: FormValues) {
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

            // Use the signIn function from your auth context to save the token
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
    }

    return (
        <>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Sign in</h1>
                            <p className="mx-auto grid w-[300px] text-balance text-muted-foreground">
                                Enter your email below to login to your account
                            </p>
                        </div>
                        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit, onError)}>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="johndoe@gmail.com" {...form.register("email")} />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" {...form.register("password")} />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                Login
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <NavLink to="/signup" className="underline">
                                Sign up
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                    <img
                        src={image}
                        alt="Paris 2024"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </>
    );
}