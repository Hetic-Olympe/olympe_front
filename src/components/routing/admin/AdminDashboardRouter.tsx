import { Route, Routes } from "react-router-dom";
import NotFound from "../../sections/NotFound/NotFound";
import AdminDashboard from "@/components/pages/admin/dashboard/AdminDashboard";
import UserEdit from "@/components/pages/admin/dashboard/AdminUserEdit/UserEdit";

export default function AdminDashboardRouter() {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/user/:id" element={<UserEdit />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}