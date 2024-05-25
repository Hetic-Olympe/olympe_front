import { NavLink } from "react-router-dom"
import styles from "./nav.module.scss";
import { ReactNode } from "react";

interface NavItemProps {
    key?: number
    to: string
    children: ReactNode
    onClick?: () => void;
}

export default function NavItem({ key, to, children, onClick }: NavItemProps) {
    return (
        <li key={key}>
            <NavLink
                end
                className={styles.sidebar__nav__link}
                to={to}
                onClick={onClick}>
                {children}
            </NavLink>
        </li>
    )
}