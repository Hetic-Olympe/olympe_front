import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../pages/admin/dashboard/AdminDashboard";
import NotFound from "../../sections/NotFound/NotFound";
import UserEdit from "../../pages/user/dashboard/UserEdit";

export default function AdminDashboardRouter() {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/user/:id" element={<UserEdit />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}