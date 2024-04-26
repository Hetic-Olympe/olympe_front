import { FC } from "react";
import NavItem from "./NavItem";
import { useAuth } from "@/contexts/AuthProvider";

interface NavProps {
    role?: 'user' | 'admin';
}

interface Page {
    id: number;
    to: string;
    title: string;
    onClick?: () => void;
}

const Nav: FC<NavProps> = ({ role = 'user' }) => {
    return (
        <nav>
            <ul>
                <NavigationItems role={role} />
                <BottomNav />
            </ul>
        </nav>
    );
}

const NavigationItems: FC<NavProps> = ({ role }) => {
    const pages: Page[] = role === 'user' ? [
        { id: 1, to: "/", title: "Dashboard" },
        { id: 2, to: "/profile", title: "Profile" },
    ] : [
        { id: 1, to: "/", title: "Dashboard" },
        { id: 2, to: "/data", title: "Data" },
    ];

    return (
        <>
            {pages.map((page) => (
                <li key={page.id}>
                    <NavItem to={page.to}>{page.title}</NavItem>
                </li>
            ))}
        </>
    );
}

const BottomNav: FC = () => {
    const { isAuthenticated, signOut } = useAuth();

    const pages: Page[] = isAuthenticated ? [
        { id: 1, to: "#", title: "Sign out", onClick: signOut }
    ] : [
        { id: 1, to: "/signin", title: "Sign in" },
        { id: 2, to: "/signup", title: "Sign up" },
    ];

    return (
        <>
            {pages.map((page) => (
                <li key={page.id}>
                    <NavItem to={page.to} onClick={page.onClick}>{page.title}</NavItem>
                </li>
            ))}
        </>
    );
}

export default Nav;