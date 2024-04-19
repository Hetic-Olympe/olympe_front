import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthProvider"

import Signin from "./components/pages/singin/Signin"
import Signup from "./components/pages/singup/Signup"
import { AdminRouter } from "./components/routing/AdminRouter"
import { UserRouter } from "./components/routing/UserRouter"

const ADMIN_PATH = '/admin'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
