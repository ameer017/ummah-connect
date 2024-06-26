import React from "react";
import heroBackground from "../../assets/hero-background.jpg";
import { FaBookQuran } from "react-icons/fa6";
import { PiBookOpenText, PiGraduationCapLight } from "react-icons/pi";
import { DiHtml5Multimedia } from "react-icons/di";

const HeroSection = () => {
  return (
    <main>
      {/* HERO SECTION */}
      {/* bg-gradient-to-b from-[#E5E7EB] to-[#9CA3AF] */}
      <section className="bg-gradient-to-b from-[#E5E7EB] to-[#9CA3AF] pt-10 h-[84vh] flex justify-center items-center">
        <div className="text-center capitalize w-[50%]">
          <span>
            <h1 className="text-[2.5rem] font-bold uppercase">
              Welcome to Ummah Connect
            </h1>
            <p className="text-[20px] font-semibold">
              Your gateway to authentic islamic learning
            </p>
          </span>
          <div className="mt-10 font-medium">
            <p>
              Whether you're a seeker of knowledge or a seasoned learner,{" "}
              <strong className="text-[#323]">Ummah Connect</strong> has
              something for you!. Explore a wide range of Islamic resources -
              Qur'an, Hadith, Lectures, Articles & more.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT-US SECTION */}
      <section className="grid place-items-center text-center py-10">
        <div className="grid place-items-center w-[60%]">
          <h2 className="font-semibold text-[1rem] text-gray-900">About Us</h2>
          <h3 className="font-semibold text-[2rem] text-gray-900 underline underline-offset-4">
            About Ummah Connect
          </h3>
          <p className="mt-4">
            We aim to bridge the knowledge gap in the Muslim Ummah by providing
            access to valuable information and resources. Our goal is to foster
            growth, development, and a well-informed community.
          </p>
        </div>
      </section>

      {/* WHAT WE OFFER SECTION */}
      <section className="grid place-items-center text-center py-10">
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
              {/* <PiBookOpenText size={100} /> */}
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
      </section>
    </main>
  );
};

export default HeroSection;
