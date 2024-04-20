import { Route, Routes } from "react-router-dom"
import AdminHome from "../pages/admin/home/AdminHome"

export function AdminRouter() {
    return (
        <>
            <header>Admin header</header>

            <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="/data" element={<div>admin data</div>} />
                <Route path="/*" element={<div>404 Not Found</div>} />
            </Routes>
        </>
    )
}