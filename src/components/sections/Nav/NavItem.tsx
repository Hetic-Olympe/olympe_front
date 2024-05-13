import { NavLink } from "react-router-dom"

interface NavItemProps {
    to: string
    children: string
    onClick?: () => void;
}

export default function NavItem({ to, children, onClick }: NavItemProps) {
    return (
        <NavLink to={to} onClick={onClick}>
            {children}
        </NavLink>
    )
}