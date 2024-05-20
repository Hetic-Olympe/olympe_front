import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { Card } from "@/components/ui/Card/Card";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/components/ui/use-toast";
import styles from "./adminDashboard.module.scss";

export interface User {
    id: string;
    createdAt: string;
    nicename: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    isConnected: boolean;
    role: {
        id: number;
        label: string;
    };
    interests: string[];
    likes: string[];
}

export default function AdminDashboard() {
    const { toast } = useToast();
    const [users, setUsers] = useState<User[]>([]);
    const { isLoading, fetchData: fetchUsers } = useFetch(
        "/admin/api/users"
    );

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await fetchUsers();
                if (data) {
                    setUsers(data);
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
    }, [fetchUsers, toast]);
    return (
        <>
            <Header title="Manage all users" subtitle="Handle users information and moderation" />
            <PageTemplate>
                <Grid>
                    <GridItem columnSpan={12} rowSpan={3}>
                        <Card title="All users">
                            <div className={styles.usersList}>
                                {isLoading && <p>Loading...</p>}
                                {users.length === 0 && <p>No users found</p>}
                                {
                                    users.map((user) => (
                                        <div className={styles.usersList__item} key={user.id}>
                                            <p>Name : {user.firstname} {user.lastname}</p>
                                            <p>Email : {user.email}</p>
                                            <p>Status : {user.isConnected ? "Connected" : "Not connected"}</p>
                                            <p>Role : {user.role.label}</p>
                                        </div>

                                    ))
                                }
                            </div>
                        </Card>

                    </GridItem>
                </Grid>
            </PageTemplate>
        </>
    )
}