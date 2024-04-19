import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import image from "@/assets/images/illustration2.jpg";

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
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

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
        await fetch('http://localhost:5001/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(async res => {
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            res.json();
            toast({
                title: "Sign up successful",
                description: `Welcome, ${values.email}!`,
            });
            navigate("/signin");
        }).catch(err => {
            console.error("err", err);
            toast({
                variant: "destructive",
                title: "Sign up failed",
                description: `Error: ${err.message}`,
            });
        }).finally(() => setIsLoading(false));
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="hidden bg-muted lg:block">
                <img
                    src={image}
                    alt="Paris 202 by night"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Sign up</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email and password to create an account
                        </p>
                    </div>
                    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="johndoe@gmail.com" {...form.register("email")} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...form.register("password")} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" {...form.register("confirmPassword")} />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            Sign up
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <NavLink to="/signin" className="underline">
                            Sign in
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}