import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
export default function AdminAthletes() {
    const { toast } = useToast();
    const [athletes, setAthletes] = useState([]);
    const { isLoading, fetchData: fetchAthletes } = useFetch(
        "/api/athletes"
    )

    useEffect(() => {
        const getAthletes = async () => {
            try {
                const { data } = await fetchAthletes();
                if (data) {
                    setAthletes(data);
                }
            } catch (err) {
                toast({
                    variant: "destructive",
                    title: "Fetch countries failed",
                    description: `Error: ${err}`,
                });
            }
        };

        getAthletes();
    }, [fetchAthletes, toast]);

    console.log('athletes', athletes)
    return (
        <>
            <Header title="List of all athletes" subtitle="Handle athletes information and moderation" />
            <PageTemplate>
                {isLoading && <p>Loading...</p>}
                {athletes.length === 0 && <p>No users found</p>}
                {
                    athletes.map((athlete) => (
                        <Link to={`/admin/athletes/${athlete.id}`} key={athlete.id}>
                            <p>{`${athlete.firstname} ${athlete.lastname}`}</p>
                            <p></p>
                        </Link>
                    ))
                }
            </PageTemplate>
        </>
    );
}