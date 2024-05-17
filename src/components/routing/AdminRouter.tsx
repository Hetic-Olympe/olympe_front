import { Route, Routes } from "react-router-dom";
import Nav from "../sections/Nav/Nav";
import {
  HomeIcon,
  CalendarIcon,
  SportIcon,
  AthleteIcon,
  CommunityIcon,
  MedalsIcon,
  CountriesIcon,
} from "../icons/icons";
import { useCreatePageLink } from "@/hooks/useCreatePageLink";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import NotFound from "../sections/NotFound/NotFound";
import AdminCountries from "../pages/admin/countries/AdminCountries";

const PRIMARY_ACTIVE_COLOR = "#FB923C";
const DEFAULT_COLOR = "#7295b0";

export function AdminRouter() {
  const createPageLink = useCreatePageLink(
    "/admin",
    PRIMARY_ACTIVE_COLOR,
    DEFAULT_COLOR
  );

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

      <aside className="pageContainer">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/events" element={<div>Events Page</div>} />
          <Route path="/countries" element={<AdminCountries />} />
          <Route path="/athletes" element={<div>Athletes Page</div>} />
          <Route path="/sports" element={<div>Sports Page</div>} />
          <Route path="/medals" element={<div>Medlas Page</div>} />
          <Route path="/community" element={<div>Community Page</div>} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </aside>
    </main>
  );
}
