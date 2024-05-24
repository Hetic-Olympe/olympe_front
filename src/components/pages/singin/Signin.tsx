import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import image from "@/assets/images/illustration.avif";
import AuthForm from "@/components/authForm/AuthForm";
import useFetch from "@/hooks/useFetch";

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
  const { fetchData: fetchSignIn, isLoading } = useFetch("/api/users/signin");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    if (role === "user") return navigate("/profile");

    navigate("/admin");
  }, [isAuthenticated, role, navigate, signIn]);

  const onError = useCallback(
    (errors: FormErrors) => {
      Object.values(errors).forEach((error) => {
        toast({
          variant: "destructive",
          title: "Form submission failed",
          description: error.message,
        });
      });
    },
    [toast]
  );

  const onSubmit = async (values: FormValues) => {
    try {
      const { data } = await fetchSignIn({
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!data) return;

      signIn(data.username, values.email, data.role, data.token, data.id);

      toast({
        title: "Sign in successful",
        description: `Welcome back, ${values.email}!`,
      });
    } catch (err) {
      console.error("err", err);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: `Error: ${err instanceof Error ? err.message : err}`,
      });
    }
  };

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
          name: "email",
        },
        {
          label: "Password",
          type: "password",
          id: "password",
          placeholder: "",
          name: "password",
        },
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
