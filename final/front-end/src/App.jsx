import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import ScrollToTop from "./Components/ScrollToTop";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Layout with Navbar
import MainLayout from "./Components/MainLayout";

// Pages
import Signup from "./pages/Signup";
import AdminSignup from "./pages/AdminSignup";
import SignupSelection from "./pages/SignupSelection";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";
import Dashboard from "./pages/Dashboard";
import HirePage from "./pages/HirePage";
import Services from "./pages/Services";
import AdminProfile from "./pages/AdminProfile";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile";
import SignupUser from "./pages/SignupUser";
import ProfileEdit from "./pages/ProfileEdit";
import Home from "./pages/Home";
import ActivateCases from "./pages/ActivateCases";
import ActiveCaseLawyer from "./pages/ActiveCaseLawyer";
import LawyerEditPage from "./pages/LawyerEditPage";
import Lawyerknowldeg from "./pages/Lawyerknowldeg";
import Termsandconditions from "./Components/Termsandconditions";
import Privacyandpolicies from "./Components/Privacyandpolicies";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Routes WITHOUT Navbar */}
        <Route path="/logintype" element={<SignupSelection />} />
        <Route path="/signup-selection" element={<SignupSelection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-user" element={<SignupUser />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-login" element={<LoginUser />} />

        {/* Routes WITH Navbar using MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/user-dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Home />} />
          <Route path="/activecasesuser/:userId" element={<ActivateCases />} />
          <Route path="/activecaselawyer/:userId" element={<ActiveCaseLawyer />} />
          <Route path="/lawyereditcases/:id" element={<LawyerEditPage />} />

          <Route path="/hire" element={<HirePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/lawyerknoeldege" element={<Lawyerknowldeg />} />
          <Route path="/termsandcontions" element={<Termsandconditions />} />
        <Route path="/privacyandpolicies" element={<Privacyandpolicies />} />


          


          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/edit-profile/:id" element={<ProfileEdit />} />
        </Route>
      </Routes>

       <ToastContainer />
    </>
  );
}

export default App;
