import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Verify from "./pages/auth/Verify";
import Layout from "./components/Layout/Layout";
import ChangePassword from "./pages/auth/ChangePassword";
import Profile from "./pages/profile/Profile";
import CreateContent from "./components/Content/CreateContent";
import EditContent from "./components/Content/EditContent";
import ContentListPage from "./components/Content/ContentListPage";
import ContentCategories from "./components/Content/ContentCategories";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
    <Route
      path="/create-content"
      element={
        <Layout>
          <CreateContent />
        </Layout>
      }
    />
    <Route
      path="/edit-content/:contentId"
      element={
        <Layout>
          <EditContent />
        </Layout>
      }
    />
    <Route
      path="/content-list"
      element={
        <Layout>
          <ContentListPage />
        </Layout>
      }
    />
    <Route
      path="/content-categories"
      element={
        <Layout>
          <ContentCategories />
        </Layout>
      }
    />
    <Route path="/verify/:verificationToken" element={<Verify />} />
    <Route
      path="/profile"
      element={
        <Layout>
          <Profile />
        </Layout>
      }
    />
    <Route
      path="/about"
      element={
        <Layout>
          <About />
        </Layout>
      }
    />
    <Route
      path="/contact"
      element={
        <Layout>
          <Contact />
        </Layout>
      }
    />
    <Route path="/change-password" element={<ChangePassword />} />
  </Routes>
);

export default AppRoutes;
