import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import Profile from "../pages/user/profile/Profile"
import Nav from "../sections/Nav/Nav"

export function UserRouter() {
    return (
        <>
            <header>User header</header>
            <Nav />

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