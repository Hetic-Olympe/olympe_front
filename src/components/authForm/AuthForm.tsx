import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldValues, UseFormReturn, FieldErrors, Path } from "react-hook-form";

interface Field<V> {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  name: Path<V>;
}

interface AuthFormProps<V extends FieldValues> {
  title: string;
  description: string;
  fields: Field<V>[];
  form: UseFormReturn<V>;
  onSubmit: (values: V) => void;
  onError: (errors: FieldErrors<V>) => void;
  isLoading: boolean;
  image: string;
  buttonText: string;
  redirectText: string;
  redirectButton: string;
  redirectLink: string;
  reverseGrid?: boolean;
}

export default function AuthForm<V extends FieldValues>({
  title,
  description,
  fields,
  form,
  onSubmit,
  onError,
  isLoading,
  image,
  buttonText,
  redirectText,
  redirectButton,
  redirectLink,
  reverseGrid = false,
}: AuthFormProps<V>) {
  const orderClasses = reverseGrid ? "lg:order-last" : "lg:order-first";

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className={`flex items-center justify-center py-12 ${orderClasses}`}>
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mx-auto grid w-[300px] text-balance text-muted-foreground">
              {description}
            </p>
          </div>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit, onError)}
          >
            {fields.map((field) => (
              <div className="grid gap-2" key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  className={"bg-background"}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...form.register(field.name)}
                />
              </div>
            ))}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {buttonText}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {redirectText}
            <NavLink to={redirectLink} className="underline">
              {redirectButton}
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
  );
}
