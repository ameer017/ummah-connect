import React, { useEffect, useLayoutEffect, useState } from "react";
import { getUser } from "../../redux/feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import useRedirectLoggedOutUser from "../../components/UseRedirect/UseRedirectLoggedOutUser";
import Sidebar from "../../components/Sidebar/Sidebar";
import PageMenu from "../../components/PageMenu/PageMenu";

const Settings = ({ userId }) => {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const initialState = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    photo: user?.photo || "",
    role: user?.role || "",
  };

  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        photo: user.photo,
      });
    }
  }, [user]);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        profile={profile}
        user={user}
      />

      <div
        className={`w-full bg-white p-4 flex justify-center ${
          isSidebarOpen ? "md:ml-1/4" : ""
        }`}
      >
        <div className="flex flex-col items-left  w-full md:w-5/6 p-4">
          <div className="p-4">
            <PageMenu/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
