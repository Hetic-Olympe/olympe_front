import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import Profile from "../pages/profile/Profile"

export function UserRouter() {
    return (
        <>
            <header>User header</header>

            <Routes>
                <Route path="/" element={<div>user dashboard</div>} />
                <Route path="data/" element={<div>user data</div>} />
                <Route
                    path="profile/"
                    element={
                        <ProtectedRoute allowedRoles={["user", "admin"]}>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route path="/*" element={<div>404 Not Found</div>} />
            </Routes>
        </>
    )
}