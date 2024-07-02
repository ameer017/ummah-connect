import React from "react";
import heroBackground from "../../assets/hero-background.jpg";
import { FaBookQuran } from "react-icons/fa6";
import { PiBookOpenText, PiGraduationCapLight } from "react-icons/pi";
import { DiHtml5Multimedia } from "react-icons/di";
import { TbRocket } from "react-icons/tb";
import { IoIosArrowRoundForward } from "react-icons/io";

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
  // Add more companies as needed
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

          <button className="bg-blue-800 text-[#fff] py-2 px-[20px] rounded-full flex items-center gap-1 my-2 ">
            Get Started <TbRocket />
          </button>
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

      {/* WHAT WE OFFER SECTION */}
      {/* <section className="grid place-items-center text-center py-10">
        <div className="w-[90%]">
          <h2 className="capitalize font-semibold text-[2rem] text-gray-900 underline underline-offset-4">
            What we offer
          </h2>
          <p className="py-4">
            <strong className="text-gray-900">Ummah Connect</strong> is your
            one-stop platform for exploring a comprehensive library of Islamic
            knowledge. We cater to Muslims of all backgrounds and knowledge
            levels, offering a diverse range of resources to enrich your
            understanding and strengthen your faith.
          </p>

          <div className="grid grid-cols-3 gap-4 *:grid *:grid-rows-3 *:justify-center *:place-items-center *:p-4">
            <div className="bg-[#D1D5DB] [&>h2]:font-semibold">
              <FaBookQuran size={100} />
              <h2>Guidance from the Qur'an & Hadith</h2>
              <p>
                Delve into the foundational texts of Islam with in-depth tafsir
                (interpretation) of the Quran and comprehensive explanations of
                authentic Hadiths.
              </p>
            </div>

            <div className="bg-gray-900 text-[#fff] [&>h2]:font-semibold">
              <PiGraduationCapLight size={100} />
              <h2>Scholarly Lectures & Courses</h2>
              <p>
                Gain insights from renowned Islamic scholars through recorded
                lectures and structured courses on various topics, from Islamic
                jurisprudence to Islamic history and personal development.
              </p>
            </div>

            <div className="bg-[#D1D5DB] [&>h2]:font-semibold">
              <DiHtml5Multimedia size={100} />
              <h2>Enriching Multimedia Resources</h2>
              <p>
                Discover a treasure trove of Islamic knowledge presented in
                various engaging formats. Explore documentaries, podcasts, and
                interactive quizzes to deepen your understanding in a
                stimulating way.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default HeroSection;
