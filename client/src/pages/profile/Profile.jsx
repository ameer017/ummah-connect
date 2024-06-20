import React from "react";
import Notification from "../../components/Notification/Notification";
import { FaPen } from "react-icons/fa";

const Profile = () => {
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

          <FaPen className="absolute top-60 right-64" size={20} color="white" title="Edit Profile" />
          <div>
            <img
              src="https://images.pexels.com/photos/15818869/pexels-photo-15818869/free-photo-of-person-riding-extremely-packed-bike.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
          <p class="text-neutral-300">Name: JOHN DOE</p>
          <p class="text-neutral-300">Email: yourname@gmail.com</p>
          <p class="text-neutral-300">Gender: Male</p>
          <p class="text-neutral-300">Role: Subscriber</p>

          <hr className="border w-screen " />
          <h3>Analytics</h3>
          <p>Content Created: 0</p>
        </div>

        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 -bottom-12 -right-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 bottom-44 right-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 bottom-24 right-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 bottom-12 right-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 bottom-12 right-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 -bottom-24 -right-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 bottom-24 right-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>
      </div>
    </div>
  );
};

export default Profile;
