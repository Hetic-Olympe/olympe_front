import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";

import Signin from "./components/pages/singin/Signin";
import Signup from "./components/pages/singup/Signup";
import { AdminRouter } from "./components/routing/AdminRouter";
import { UserRouter } from "./components/routing/UserRouter";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<UserRouter />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminRouter />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;