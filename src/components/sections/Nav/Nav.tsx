import { FC, ReactNode } from "react";
import NavItem from "./NavItem";
import { useAuth } from "@/contexts/AuthProvider";
import CalendarIcon from "@/components/icons/CalendarIcon";
import logo from "@/assets/images/logo.png";
import styles from "./nav.module.scss";
import clsx from "clsx";

interface Page {
    to: string;
    title: string;
    icon?: ReactNode;
    onClick?: () => void;
}

interface NavProps {
    pages: Page[];
}

const Nav: FC<NavProps> = ({ pages }) => (
    <div className={styles.sidebar}>
        <div className={styles.sidebar__logo}>
            <img src={logo} alt="Olympe logo" />
        </div>
        <nav className={styles.sidebar__nav}>
            <ul className={styles.sidebar__nav__items}>
                {pages.map((page, index) => (
                    <NavItem key={index} to={page.to}>
                        {page.icon}
                        {page.title}
                    </NavItem>
                ))}
            </ul>
            <ul className={clsx(styles.sidebar__nav__items, styles['sidebar__nav__items--bottom'])}>
                <BottomNav />
            </ul>
        </nav>
    </div>
);

const BottomNav: FC = () => {
    const { isAuthenticated, signOut } = useAuth();

    const pages: Page[] = isAuthenticated ? [
        { to: "/logout", title: "Logout", onClick: signOut }
    ] : [
        { to: "/signin", title: "Login" },
    ];

    return (
        <ul>
            {pages.map((page, index) => (
                <NavItem key={index} to={page.to} onClick={page.onClick}>
                    <CalendarIcon />
                    {page.title}
                </NavItem>
            ))}
        </ul>
    );
}

export default Nav;