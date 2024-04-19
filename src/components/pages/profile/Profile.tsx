import { useAuth } from "@/contexts/AuthProvider";

export default function Profile() {
    const { auth } = useAuth();
    const email = auth?.username;
    return (
        <div>
            Hello {email}
        </div>
    )
}