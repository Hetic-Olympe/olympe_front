import { Route, Routes } from "react-router-dom";
import NotFound from "../../sections/NotFound/NotFound";
import AdminDashboard from "@/components/pages/admin/dashboard/AdminDashboard";
import AdminUserDetail from "@/components/pages/admin/dashboard/AdminUserDetail/AdminUserDetail";

export default function AdminDashboardRouter() {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/user/:id" element={<AdminUserDetail />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}