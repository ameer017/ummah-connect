import React, { useState } from "react";
import Notification from "../../components/Notification/Notification";
import { FaPen } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <div class="cursor-pointer group overflow-hidden p-5 duration-1000 hover:duration-1000 relative w-screen h-[80vh] bg-neutral-800 ">
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-44 left-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>

        <div class="w-full h-full shadow-xl shadow-neutral-900 p-3  rounded-xl flex-col gap-2 flex justify-center items-center text-white">
          {/* {!profile.isVerified && <Notification/>} */}

      
          <div>
            <img
              src="https://images.pexels.com/photos/15818869/pexels-photo-15818869/free-photo-of-person-riding-extremely-packed-bike.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
          <p class="text-neutral-300">
            Name: Daud Kim &nbsp; Username: daud246
          </p>
          <p class="text-neutral-300">Email: yourname@gmail.com</p>
          <p class="text-neutral-300">Gender: Male</p>
          <p class="text-neutral-300">Role: Subscriber</p>

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
          <div className="flex gap-[10px] w-300px flex-col md:w-screen md:flex-row items-center justify-center  text-center p-2">
            <div>
              <h2 className="font-bold text-2xl">Activity and Contributions</h2>
              <p>Posts: (List or Link to Posts)</p>
              <p>Posts: (List or Link to Posts)</p>
            </div>
            <div>
              <h2 className="font-bold text-2xl">Personal Information</h2>
              <p>Location: New York, USA</p>
              <p>Location: New York, USA</p>
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

        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 -bottom-12 -right-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 bottom-44 right-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 bottom-24 right-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 bottom-12 right-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 bottom-12 right-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 -bottom-24 -right-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 bottom-24 right-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>
      </div>

      <EditProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Profile;
