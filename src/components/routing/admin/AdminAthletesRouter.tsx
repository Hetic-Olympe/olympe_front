import { Route, Routes } from "react-router-dom";
import NotFound from "../../sections/NotFound/NotFound";
import AdminAthletes from "@/components/pages/admin/athletes/AdminAthletes";
import AdminAthletesDetails from "@/components/pages/admin/athletes/AdminAthletesDetails";

export default function AdminAthletesRouter() {
    return (
        <Routes>
            <Route path="/" element={<AdminAthletes />} />
            <Route path="/:id" element={<AdminAthletesDetails />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}