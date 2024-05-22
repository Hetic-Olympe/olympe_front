import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import Header from '@/components/sections/Header/Header';
import PageTemplate from '@/components/sections/PageTeample/PageTemplate';
import { Card } from '@/components/ui/Card/Card';
import { Grid, GridItem } from '@/components/ui/Grid/Grid';
import { useParams } from 'react-router-dom';
import { User } from '../AdminDashboard';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Save } from "lucide-react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

type FormData = {
    firstname?: string;
    lastname?: string;
    role?: string;
    email?: string;
    phone?: string;
};

enum RoleLabel {
    USER = "user",
    ADMIN = "admin"
}

const UserSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    role: z.object({
        id: z.number(),
        label: z.enum([RoleLabel.USER, RoleLabel.ADMIN]),
    }),
    email: z.string().email({
        message: "Email must be a valid email address.",
    }),
    phone: z.string().optional(),
});

export default function UserEdit() {
    const { id } = useParams<{ id: string }>();
    const { toast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const { isLoading, fetchData: fetchUser } = useFetch(
        `/admin/api/users/${id}`
    );

    const form = useForm({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            firstname: user?.firstname,
            lastname: user?.lastname,
            role: user?.role.label,
            email: user?.email,
            phone: user?.phone,
        },
    });

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await fetchUser();
                if (data) {
                    setUser(data);
                    form.reset({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        role: data.role,
                        email: data.email,
                        phone: data.phone,
                    });
                }
            } catch (err) {
                toast({
                    variant: "destructive",
                    title: "Fetch countries failed",
                    description: `Error: ${err}`,
                });
            }
        };

        getUsers();
    }, [form, fetchUser, toast]);

    const onSubmit = useCallback(async (formData: FormData) => {
        try {
            const { data } = await fetchUser({
                method: "PATCH",
                body: JSON.stringify(formData),
            });

            if (!data) return;

            toast({
                title: "User updated successfully",
                description: `User ${data.firstname} ${data.lastname} has been updated.`,
            });
        } catch (err) {
            console.error("err", err);
            toast({
                variant: "destructive",
                title: "User update failed",
                description: `Error: ${err instanceof Error ? err.message : err}`,
            });
        }
    }, [fetchUser, toast]);

    return (
        <>
            <Header title="Edit a user" subtitle="Edit or show information on a specific user" />
            <PageTemplate>
                {isLoading && <p>Loading...</p>}
                {user === null && !isLoading && <p>User not found</p>}
                {!isLoading && user !== null && (
                    <Grid>
                        <GridItem columnSpan={6} rowSpan={2}>
                            <Card title="Profile picture" minHeight={336}>
                                content
                            </Card>
                        </GridItem>
                        <GridItem columnSpan={6} rowSpan={1}>
                            <Card title="Interests" minHeight={173}>
                                content
                            </Card>
                        </GridItem>
                        <GridItem columnSpan={6} rowSpan={2}>
                            <Card title="Contributions" minHeight={417}>
                                content
                            </Card>
                        </GridItem>
                        <GridItem columnSpan={6} rowSpan={1}>
                            <Card title="Personal Information">
                                <Form {...form} >
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 mt-2">
                                        <FormField control={form.control} name="firstname" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Firstname</FormLabel>
                                                <Input id="firstname" type="text" onChange={field.onChange} defaultValue={field.value} />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="lastname" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Lastname</FormLabel>
                                                <Input id="lastname" type="text" onChange={field.onChange} defaultValue={field.value} />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="role" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role</FormLabel>
                                                <Select
                                                    onValueChange={value => field.onChange({ id: value === 'user' ? 2 : 1, label: value })}
                                                    defaultValue={(field.value as any).label}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="user">User</SelectItem>
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>Choose the role of the user. This is a critical action.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <Input id="email" type="email" onChange={field.onChange} defaultValue={field.value} />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <Input id="phone" type="tel" onChange={field.onChange} defaultValue={field.value} />
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <div className="flex justify-end mt-4">
                                            <Button type="submit"> <Save className="mr-2 h-4 w-4 right-button" />Save</Button>
                                        </div>
                                    </form>
                                </Form>
                            </Card>
                        </GridItem>
                    </Grid>
                )}
            </PageTemplate>
        </>
    );
}