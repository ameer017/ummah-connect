import React, { useEffect, useLayoutEffect, useState } from "react";
import Notification from "../../components/Notification/Notification";
import { FaPen } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/auth/authSlice";
import PageMenu from "../../components/PageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../components/UseRedirect/UseRedirectLoggedOutUser";

const Profile = ({ userId }) => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );


  const initialState = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    emailAddress: user?.emailAddress || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    isVerified: user?.isVerified || false,
    photo: user?.photo || "",
    role: user?.role || "",
    interests: user?.interests || "",
    location: user?.location || "",
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch]);

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phone: user.phone,
        username: user.username,
        gender: user.gender,
        role: user.role,
        isVerified: user.isVerified,
        photo: user.photo,
        interests: user.interests,
        location: user.location,
      });
    }
  }, [user]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="cursor-pointer group overflow-hidden p-5 duration-1000 hover:duration-1000 relative w-screen h-[80vh] bg-neutral-800 ">
        <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-44 left-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        <div className="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
        <div className="group-hover:rotate-45 bg-transparent group-hover:scale-150 -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
        <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>

        <div className="w-full h-full shadow-xl shadow-neutral-900 p-3  rounded-xl flex-col gap-2 flex justify-center items-center text-white">
          {!profile.isVerified && <Notification />}

          <PageMenu/>

          <div>
            <img
              src={imagePreview === null ? user?.photo : imagePreview}
              alt=""
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
          <p className="text-neutral-300">
            Name: {profile.firstName} &nbsp; Username: {profile.username}
          </p>
          <p className="text-neutral-300">Email: {profile.emailAddress}</p>
          <p className="text-neutral-300">Gender: {profile.gender} </p>
          <p className="text-neutral-300">Role: {profile.role} </p>

          <div className="flex gap-4">
            <a href="#">
              <FaFacebookF size={20} color="white" />
            </a>
            <a href="#">
              <FaInstagram size={20} color="white" />
            </a>
            <a href="#">
              <FaLinkedin size={20} color="white" />
            </a>
            <a href="#">
              <BsTwitterX size={20} color="white" />
            </a>

            <FaPen
              className=""
              size={20}
              color="white"
              title="Edit Profile"
              onClick={openModal}
            />
          </div>

          <hr className="border w-screen " />
          <div className="flex gap-[10px] w-300px flex-col md:w-screen md:flex-row  justify-center  text-center p-2">
            <div>
              <h2 className="font-bold text-2xl">Activity and Contributions</h2>
              <p>Posts: (List or Link to Posts)</p>
              <p>Posts: (List or Link to Posts)</p>
            </div>
            <div>
              <h2 className="font-bold text-2xl">Personal Information</h2>
              <p>Location: {profile.location} </p>
              
            </div>
            <div>
              <h2 className="font-bold text-2xl">
                Educational and Professional Information
              </h2>
              <p>Education: BSc in Computer Science, XYZ University</p>
              <p>Profession: Software Engineer at ABC Corp</p>
            </div>
          </div>
        </div>

        <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 -bottom-12 -right-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:rotate-45 bg-transparent group-hover:scale-150 bottom-44 right-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 bottom-24 right-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 bottom-12 right-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        <div className="group-hover:rotate-45 bg-transparent group-hover:scale-150 bottom-12 right-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
        <div className="group-hover:rotate-45 bg-transparent group-hover:scale-150 -bottom-24 -right-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
        <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 bottom-24 right-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>
      </div>

      <EditProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Profile;
