import { Route, Routes } from "react-router-dom";
import NotFound from "../../sections/NotFound/NotFound";
import AdminDashboard from "@/components/pages/admin/dashboard/AdminDashboard";
import UserDetail from "@/components/pages/common/userDetail/UserDetail";

export default function AdminDashboardRouter() {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}