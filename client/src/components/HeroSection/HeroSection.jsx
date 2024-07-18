import React, { useEffect, useState } from "react";
import heroBackground from "../../assets/hero-background.jpg";
import { FaBookQuran } from "react-icons/fa6";
import { PiBookOpenText, PiGraduationCapLight } from "react-icons/pi";
import { DiHtml5Multimedia } from "react-icons/di";
import { TbRocket } from "react-icons/tb";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const companies = [
  {
    name: "Company One",
    logo: "",
    description: "This is a brief description of Company One.",
  },
  {
    name: "Company Two",
    logo: "",
    description: "This is a brief description of Company Two.",
  },
  {
    name: "Company Three",
    logo: "",
    description: "This is a brief description of Company Three.",
  },
];

const spotlight = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    title: "Understanding Quran",
    description: "An insightful article about understanding the Quran.",
    link: "#",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "Basics of Fiqh",
    description: "Learn the basics of Islamic Jurisprudence.",
    link: "#",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "Hadith Compilation",
    description: "A comprehensive guide on Hadith compilation.",
    link: "#",
  },
];

const HeroSection = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`${URL}/discussion/all-threads`);
        setThreads(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <main className="bg-[#fff]">
      {/* HERO SECTION */}
      {/* bg-gradient-to-b from-[#E5E7EB] to-[#9CA3AF] */}
      <section className="bg-[#fff] pt-10 h-[84vh] flex justify-center items-center">
        <div className="text-center w-[50%] flex flex-col items-center justify-center">
          <h1 className="text-[2.5rem] font-bold capitalize w-[70%] ">
            Your gateway to the Muslim Community
          </h1>

          <p className="mt-10 font-medium">
            Join a community of learners. Explore courses, engage in
            discussions, and join inspiring events. Connect with the{" "}
            <b>Ummah</b> and start your journey today.
          </p>

          <Link
            to="/register"
            className="bg-blue-800 text-[#fff] py-2 px-[20px] rounded-full flex items-center gap-1 my-2 "
          >
            Get Started <TbRocket />
          </Link>
        </div>
      </section>

      {/* COLLABORATE */}

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 overflow-hidden">
          <p className="text-[15px] text-center mb-8">
            We collaborate with over <span className="text-blue-800">325 </span>{" "}
            leading universities and companies.{" "}
          </p>
          <div className="relative">
            <div className="flex items-center space-x-8 animate-marquee">
              {companies.map((company, index) => (
                <img
                  key={index}
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-24"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT-US SECTION */}
      <section className="flex text-center py-10">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            In the Spotlight
          </h2>
          <p className="text-[15px] text-center my-6">
            Stay Informed and Engaged with Highlighted Articles and Videos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {spotlight.map((card) => (
              <div
                key={card.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-700 mb-4">{card.description}</p>
                  <a
                    href={card.link}
                    className="text-black underline flex gap-1 items-center"
                  >
                    <IoIosArrowRoundForward /> Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-[#0a66c2] ">
            <div className="flex items-center text-white p-2 justify-center  flex-col">
                <p className="text-center text-[20px] w-2/4 ">
                Discover our Mentorship Program offering guidance in career, personal development, and spiritual growth. Our mentors are here to support your journey.
                Sign Up for Mentorship
                </p>

                <Link to="/mentors-overview" className="rounded-full px-4 py-2 bg-white text-[#0a66c2] my-4">Get Mentorship</Link>
            </div>

      </section>

      <section className="py-10">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between p-2">
            <h1 className="text-3xl font-bold w-[10%] ">
              Join The Conversation
            </h1>

            <Link to="/forum" className="flex items-center gap-2">
              <IoIosArrowRoundForward size={20} />
              Visit the Forum
            </Link>
          </div>

          <div className=" py-6 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {threads?.length > 0 ? (
                threads.map((thread) => (
                  <div
                    key={thread._id}
                    className="w-full bg-neutral-100 p-4 border rounded-lg cursor-pointer"
                  >
                    <p className="mt-4 font-bold">{thread.title}</p>
                    <p className="text-gray-700 border-b py-2">
                      {thread.content.length > 50
                        ? `${thread.content.substring(0, 50)}...`
                        : thread.content}
                    </p>
                    <Link
                      to={`/threads/${thread._id}`}
                      className="text-[12px] font-semibold text-black hover:underline flex items-center mt-4 flex justify-between"
                    >
                     View Thread <IoIosArrowRoundForward size={20} /> 
                    </Link>
                  </div>
                ))
              ) : (
                <p>No recent forum activity.</p>
              )}
            </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
