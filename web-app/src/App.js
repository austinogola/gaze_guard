import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Usage from "./components/Usage";
import Settings from "./components/Settings";
import Plans from "./components/Plans";
import Checkout from "./components/Checkout";
import PlansPayments from "./components/plans_payments";
import ForgotPassword from "./components/forgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/plan-payments" element={<PlansPayments />} />
        <Route path="/usage" element={<Usage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
