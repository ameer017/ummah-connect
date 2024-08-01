import React, { useEffect, useState } from "react";
import heroBackground from "../../assets/hero-background.jpg";
import { FaBookQuran } from "react-icons/fa6";
import { PiBookOpenText, PiGraduationCapLight } from "react-icons/pi";
import { DiHtml5Multimedia } from "react-icons/di";
import { TbRocket } from "react-icons/tb";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

  const [spotlight, setSpotlight] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get(`${URL}/content/contents`);
        const filteredContent = response.data.filter(
          (content) => content.type !== "audio"
        );
        setSpotlight(filteredContent);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        setError("Failed to fetch content");
        setLoading(false);
      }
    };

    fetchContents();
  }, []);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <main className="bg-[#fff]">
      {/* HERO SECTION */}
      {/* bg-gradient-to-b from-[#E5E7EB] to-[#9CA3AF] */}
      <section className="bg-[#fff] pt-10 h-[84vh] flex justify-center items-center">
        <div className="text-center w-full md:w-[933px] flex flex-col items-center justify-center">
          <h1 className="text-[30px] md:text-[50px] font-bold capitalize w-full font-Guminert font-[700] ">
            Your gateway to the Muslim Community
          </h1>

          <p className="mt-10 font-medium text-[15px] px-4 ">
            Join a community of learners. Explore courses, engage in
            discussions, and join inspiring events. Connect with the{" "}
            <b>Ummah</b> and start your journey today.
          </p>

          <Link
            to="/register"
            className="bg-[#0a66c2] text-[#fff] py-2 px-[20px] rounded-full flex items-center gap-1 my-2 hover:-translate-y-1 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
          >
            Get Started <TbRocket />
          </Link>
        </div>
      </section>

      {/* COLLABORATE */}

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 overflow-hidden">
          <p className="text-[23px] text-center mb-8">
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

      {/* SpotLight SECTION */}
      <section className="flex text-center py-10">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            In the Spotlight
          </h2>
          <p className="text-[15px] text-center my-6">
            Stay Informed and Engaged with Highlighted Articles and Videos
          </p>

          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {spotlight.map((card) => (
              <div
                key={card._id}
                className="bg-white shadow-md rounded-lg overflow-hidden mx-2"
              >
                {card.type === "article" && (
                  <img
                    src={card.fileUrl}
                    alt={card.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                {card.type === "audio" && (
                  <audio controls className="w-full">
                    <source src={card.fileUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
                {card.type === "video" && (
                  <video controls className="w-full h-48 object-cover">
                    <source src={card.fileUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-700 mb-4">
                    {card.description.length > 50
                      ? `${card.description.substring(0, 50)}...`
                      : card.description}
                  </p>
                  <a
                    href={`/content/single/${card._id}`}
                    className="text-black underline flex gap-1 items-center"
                  >
                    <IoIosArrowRoundForward /> Read more
                  </a>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Community Highlights */}
      {/* <section className="flex text-center py-10">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Community Highlights
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
      </section> */}

      <section className="py-10 bg-[#0a66c2] ">
        <div className="flex items-center text-white p-2 justify-center  flex-col py-6">
          <p className="text-center text-[20px] w-full md:w-3/4  ">
            Discover our Mentorship Program offering guidance in career,
            personal development, and spiritual growth. Our mentors are here to
            support your journey. Sign Up for Mentorship
          </p>

          <Link
            to="/create-mentorship"
            className="rounded-full px-4 py-2 bg-white text-[#000] my-4 hover:-translate-y-1 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Sign Up For Mentorship
          </Link>
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
