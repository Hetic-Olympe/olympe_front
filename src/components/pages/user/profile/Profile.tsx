import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";

export default function Profile() {
    const { auth } = useAuth();
    const email = auth?.username;

    const fetchUser = useFetch('/users/me');

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await fetchUser({ method: 'GET' });
                console.log(data);
            } catch (err) {
                console.error("err", err);
            }
        };

        getUser();
    }, [fetchUser]);

    return (
        <div>
            Hello {email}
        </div>
    )
}