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
import ContentCategories from "./components/Content/ContentCategories";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import UserList from "./components/Lists/UsersList";
import ForumList from "./components/Forum/ForumList";
import CreateThread from "./components/Forum/CreateThread";
import ReportThread from "./components/Forum/ReportThread";
import ThreadDetail from "./components/Forum/ThreadDetail";
import EventList from "./components/Event/EventList";
import CourseList from "./components/Courses/CourseList";
import EventDetails from "./components/Event/EventDetails";
import EventCreate from "./components/Event/EventCreate";
import Settings from "./pages/settings/Settings";
import Article from "./components/Content/Article";
import ContentDetail from "./components/Content/ContentDetail";
import SuscriptionList from "./components/Lists/SuscriptionList";
import Unsubscribe from "./components/Footer/Unsubscribe";
import MentorshipSignUp from "./components/Mentorship/Mentorship";
import FindMentorMentee from "./components/Mentorship/FindMentors";
import ScheduleSession from "./components/Mentorship/ScheduleSession";

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
      path="/content/:id"
      element={
        <Layout>
          <Article />
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
      path="/content/single/:id"
      element={
        <Layout>
          <ContentDetail />
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
    <Route
      path="/settings"
      element={
        <Layout>
          <Settings />
        </Layout>
      }
    />
    <Route path="/change-password" element={<ChangePassword />} />

    <Route
      path="/users"
      element={
        <Layout>
          <UserList />
        </Layout>
      }
    />
    <Route
      path="/subscribers"
      element={
        <Layout>
          <SuscriptionList />
        </Layout>
      }
    />
    <Route
      path="/unsubscribe"
      element={
        <Layout>
          <Unsubscribe />
        </Layout>
      }
    />
    <Route
      path="/forum"
      element={
        <Layout>
          <ForumList />
        </Layout>
      }
    />
    <Route
      path="/create-thread"
      element={
        <Layout>
          <CreateThread />
        </Layout>
      }
    />
    <Route
      path="/threads/:id"
      element={
        <Layout>
          <ThreadDetail />
        </Layout>
      }
    />

    <Route
      path="/report-thread"
      element={
        <Layout>
          <ReportThread />
        </Layout>
      }
    />

    <Route
      path="/event-list"
      element={
        <Layout>
          <EventList />
        </Layout>
      }
    />
    <Route
      path="/course-list"
      element={
        <Layout>
          <CourseList />
        </Layout>
      }
    />
    <Route
      path="/event/:id"
      element={
        <Layout>
          <EventDetails />
        </Layout>
      }
    />
    <Route
      path="/create-event"
      element={
        <Layout>
          <EventCreate />
        </Layout>
      }
    />

    <Route
      path="/mentors-overview"
      element={
        <Layout>
          <FindMentorMentee tag="mentor" />
        </Layout>
      }
    />
    <Route
      path="/mentors-overview"
      element={
        <Layout>
          <FindMentorMentee tag="mentee" />
        </Layout>
      }
    />
    <Route
      path="/create-mentorship"
      element={
        <Layout>
          <MentorshipSignUp />
        </Layout>
      }
    />
    <Route
      path="/schedule-session/:id"
      element={
        <Layout>
          <ScheduleSession />
        </Layout>
      }
    />
  </Routes>
);

export default AppRoutes;
