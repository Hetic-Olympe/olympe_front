import { FC, ReactNode } from "react";
import NavItem from "./NavItem";
import { useAuth } from "@/contexts/AuthProvider";
import logo from "@/assets/images/logo.png";
import styles from "./nav.module.scss";
import clsx from "clsx";

import { LogOut, User } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
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
    const { isAuthenticated, signOut, user } = useAuth();

    if (!isAuthenticated) {
        return <NavItem to="/signin">Login</NavItem>;
    }

    return (
        <div className="flex items-center justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Avatar>
                            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                            <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
                         </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.username}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default Nav;