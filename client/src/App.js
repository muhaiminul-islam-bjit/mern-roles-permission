import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/login/Login";
import Register from "./pages/Register";
import Roles from "./pages/role/roles";
import Users from "./pages/user/users";
import UnAuthorized from "./pages/auth/unauthorized";
import Store from "./pages/store/store";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Route>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="users">
          <Route index element={<PrivateRoute><Users /></PrivateRoute>} />
        </Route>
        <Route path="roles">
          <Route index element={<PrivateRoute><Roles /></PrivateRoute>} />
        </Route>
        <Route path="stores">
          <Route index element={<PrivateRoute><Store /></PrivateRoute>} />
        </Route>
        <Route path="unauthorized">
          <Route index element={<PrivateRoute><UnAuthorized /></PrivateRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
