import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/login/Login";
import Register from "./pages/Register";
import Roles from "./pages/role/roles";
import Users from "./pages/user/users";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="users">
          <Route index element={<PrivateRoute><Users /></PrivateRoute>} />
        </Route>
        <Route path="roles">
          <Route index element={<PrivateRoute><Roles /></PrivateRoute>} />
        </Route>

        <Route path="/inbox/:id" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
