import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zNotNullStringSchema } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthProvider";
import { RoleLabel, User } from "@/types/User";

interface AdminUserInformationFormProps {
  user: User | null;
  fetchUser: (options?: RequestInit) => Promise<{ data: User }>;
  syncUser: (updatedUser: User) => void;
  isAdmin: boolean;
}

type FormData = {
  firstname?: string;
  lastname?: string;
  role?: {
    id?: number;
    label?: RoleLabel;
  };
  email?: string;
  phone?: string;
};

const UserSchema = z.object({
  firstname: zNotNullStringSchema("Firstname"),
  lastname: zNotNullStringSchema("Lastname"),
  role: z
    .object({
      id: z.number().optional(),
      label: z.enum([RoleLabel.USER, RoleLabel.ADMIN]).optional(),
    })
    .optional(),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  phone: z.string().optional().nullable(),
});

export default function UserInformationForm({
  user,
  fetchUser,
  syncUser,
  isAdmin,
}: AdminUserInformationFormProps) {
  const { toast } = useToast();
  const { updateUserCookies } = useAuth();

  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      role: user?.role
        ? {
            id: user.role.id,
            label: user.role.label,
          }
        : undefined,
      email: user?.email,
      phone: user?.phone,
    },
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      try {
        const { data } = await fetchUser({
          method: "PATCH",
          body: JSON.stringify(formData),
        });

        if (!data) return;

        syncUser(data);
        updateUserCookies(data.firstname || "John Doe", data.email);

        toast({
          title: "User updated successfully",
          description: `User has been updated.`,
        });
      } catch (err) {
        console.error("err", err);
        toast({
          variant: "destructive",
          title: "User update failed",
          description: `Error: ${err instanceof Error ? err.message : err}`,
        });
      }
    },
    [fetchUser, toast, syncUser, updateUserCookies]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 mt-2">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <Input
                id="firstname"
                type="text"
                onChange={field.onChange}
                defaultValue={field.value || undefined}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <Input
                id="lastname"
                type="text"
                onChange={field.onChange}
                defaultValue={field.value || undefined}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                type="email"
                onChange={field.onChange}
                defaultValue={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <Input
                id="phone"
                type="tel"
                onChange={field.onChange}
                defaultValue={field.value || undefined}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        {isAdmin && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange({
                      id: value === "user" ? 2 : 1,
                      label: value,
                    })
                  }
                  defaultValue={field?.value?.label}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the role of the user. This is a critical action.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-end mt-4">
          <Button type="submit">
            {" "}
            <Save className="mr-2 h-4 w-4 right-button" />
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
