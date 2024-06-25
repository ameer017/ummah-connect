import React from "react";

const HeroSection = () => {
  return (
    <main>
      <section className="pt-10 bg-red-500 h-[84vh] flex justify-center items-center">
        <div className="bg-emerald-500 text-center capitalize w-[50%]">
          <span>
            <h1 className="text-[3rem] font-bold uppercase">Ummah Connect</h1>
            <p className="">Your gateway to authentic islamic learning</p>
          </span>
          <div className="mt-10">
            <p>
              Whether you're a seeker of knowledge or a seasoned learner, <strong className="text-emerald-200">Ummah
              Connect</strong> has something for you!. Explore a wide range of Islamic
              resources - Qur'an, Hadith, Lectures, Articles & more.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
