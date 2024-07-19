import { Route, Routes } from "react-router-dom";
import NotFound from "../../sections/NotFound/NotFound";
import UserDetail from "@/components/pages/common/userDetail/UserDetail";
import UserAddForm from "@/components/pages/admin/forms/users/UserAddForm";
import AdminDashboard from "@/components/pages/admin/dashboard/users/AdminDashboard";

export default function AdminDashboardRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/user/:id" element={<UserDetail />} />
      <Route path="/user/add" element={<UserAddForm />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
