import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

export function UserRouter() {
    return (
        <>
            <header>User header</header>

            <Routes>
                <Route path="/" element={<div>user dashboard</div>} />
                <Route path="data" element={<div>user data</div>} />
                <Route path="/*" element={<div>404 Not Found</div>} />
            </Routes>
        </>
    )
}