import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "../ProtectedRoute"
import UserDetail from "@/components/pages/common/userDetail/UserDetail"
import Nav from "../../sections/Nav/Nav"
import { HomeIcon, CalendarIcon, StatsIcon, AthleteIcon, CommunityIcon } from "../../icons/icons"
import { useCreatePageLink } from "@/hooks/useCreatePageLink"
import NotFound from "@/components/sections/NotFound/NotFound"
import UserDashboard from "@/components/pages/user/dashboard/UserDashboard"
import Athletes from "@/components/pages/user/athletes/Athletes"
import { useAuth } from "@/contexts/AuthProvider"

const PRIMARY_ACTIVE_COLOR = "#23B2F5";
const DEFAULT_COLOR = "#7295b0"

export function UserRouter() {
    const { user } = useAuth();

    const createPageLink = useCreatePageLink("", PRIMARY_ACTIVE_COLOR, DEFAULT_COLOR);

    const USER_PAGES = [
        createPageLink("/", "Dashboard", HomeIcon),
        createPageLink("/calendar", "Calendar", CalendarIcon),
        createPageLink("/statistics", "Statistics", StatsIcon),
        createPageLink("/athletes", "Athletes", AthleteIcon),
        createPageLink("/community", "Community", CommunityIcon),
    ];

    return (
        <main className="main user">
            <Nav pages={USER_PAGES} />
            <div className="pageContainer">
                <Routes>
                    <Route path="/" element={<UserDashboard />} />
                    <Route path="/athletes" element={<Athletes />} />
                    <Route path="data/" element={<div>user data</div>} />
                    <Route
                        path="profile/"
                        element={
                            <ProtectedRoute allowedRoles={["user", "admin"]}>
                                <UserDetail id={user?.id} />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </main>
    )
}