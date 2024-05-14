import { Route, Routes } from "react-router-dom"
import AdminHome from "../pages/admin/home/AdminHome"
import Nav from "../sections/Nav/Nav"
import { HomeIcon, CalendarIcon, SportIcon, AthleteIcon, CommunityIcon, MedalsIcon, CountriesIcon } from "../icons/icons"
import { useCreatePageLink } from "@/hooks/useCreatePageLink"

const PRIMARY_ACTIVE_COLOR = "#FB923C";
const DEFAULT_COLOR = "#7295b0"

export function AdminRouter() {
    const createPageLink = useCreatePageLink("/admin", PRIMARY_ACTIVE_COLOR, DEFAULT_COLOR);

    const ADMIN_PAGES = [
        createPageLink("", "Dashboard", HomeIcon),
        createPageLink("/events", "Events", CalendarIcon),
        createPageLink("/countries", "Countries", CountriesIcon),
        createPageLink("/athletes", "Athletes", AthleteIcon),
        createPageLink("/sports", "Sports", SportIcon),
        createPageLink("/medals", "Medals", MedalsIcon),
        createPageLink("/community", "Community", CommunityIcon),
    ];

    return (
        <main className="main admin">
            <Nav pages={ADMIN_PAGES} />

            <div className="pageContainer">
                <header>Admin header</header>

                <Routes>
                    <Route path="/" element={<AdminHome />} />
                    <Route path="/events" element={<div>Events Page</div>} />
                    <Route path="/countries" element={<div>Countries Page</div>} />
                    <Route path="/athletes" element={<div>Athletes Page</div>} />
                    <Route path="/sports" element={<div>Sports Page</div>} />
                    <Route path="/*" element={<div>404 Not Found</div>} />
                </Routes>
            </div>
        </main>
    )
}