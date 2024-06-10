import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import ResetPassword from "./components/ResetPassword/Reset.jsx";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset/password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
