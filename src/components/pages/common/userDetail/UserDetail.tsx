import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import Header from '@/components/sections/Header/Header';
import PageTemplate from '@/components/sections/PageTeample/PageTemplate';
import { Card } from '@/components/ui/Card/Card';
import { Grid, GridItem } from '@/components/ui/Grid/Grid';
import { useParams } from 'react-router-dom';
import { User } from '../../admin/dashboard/AdminDashboard';
import UserInformationForm from "./UserInformationForm";
import UserInterests from "./UserInterests";

interface AdminUserDetailProps {
    id?: string | null | undefined;
}

export default function UserDetail({ id: propId = null }: AdminUserDetailProps) {
    const { id: urlId } = useParams<{ id: string }>();
    const id = propId ?? urlId;
    const isAdmin = !propId;

    const { toast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const { isLoading: userIsLoading, fetchData: fetchUser } = useFetch(
        !isAdmin ? '/api/users/me' : `/admin/api/users/${id}`
    );

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await fetchUser();
                if (data) {
                    setUser(data);
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
    }, [fetchUser, toast]);

    return (
        <>
            <Header title="Edit a user" subtitle="Edit or show information on a specific user" />
            <PageTemplate>
                {user === null && !userIsLoading && <p>User not found</p>}
                {user !== null && (
                    <Grid>
                        <GridItem columnSpan={6} rowSpan={2}>
                            <Card title="Profile picture" minHeight={336}>
                                content
                            </Card>
                        </GridItem>
                        <GridItem columnSpan={6} rowSpan={1}>
                            <Card title="Interests">
                                <UserInterests user={user} />
                            </Card>
                        </GridItem>
                        <GridItem columnSpan={6} rowSpan={2}>
                            <Card title="Contributions" minHeight={417}>
                                content
                            </Card>
                        </GridItem>
                        <GridItem columnSpan={6} rowSpan={1}>
                            <Card title="Personal Information" isLoading={userIsLoading} minHeight={400}>
                                <UserInformationForm user={user} fetchUser={fetchUser} syncUser={setUser} isAdmin={isAdmin} />
                            </Card>
                        </GridItem>
                    </Grid>
                )}
            </PageTemplate>
        </>
    );
}