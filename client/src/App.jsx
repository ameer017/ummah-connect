import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
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

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
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

      <Route
        path="/verify/:verificationToken"
        element={
          <Layout>
            <Verify />
          </Layout>
        }
      />

      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

      <Route
        path="/change-password"
        element={
          <Layout>
            <ChangePassword />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
