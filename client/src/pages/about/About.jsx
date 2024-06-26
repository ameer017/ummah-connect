import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600">Learn more about our mission, vision, and the team behind our platform.</p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Introduction</h2>
        <p className="text-gray-700">
          Welcome to our platform! We aim to bridge the knowledge gap in the Muslim Ummah by providing access to valuable information and resources. Our goal is to foster growth, development, and a well-informed community.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Mission</h2>
        <p className="text-gray-700">
          Our mission is to create a comprehensive platform that centralizes high-quality Islamic content. We strive to make this information easily accessible and engaging, empowering individuals to enhance their understanding of Islam and its teachings.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Vision</h2>
        <p className="text-gray-700">
          We envision a world where every Muslim has access to accurate and beneficial Islamic knowledge. Our platform aims to become a trusted source for educational materials, fostering a community that values continuous learning and spiritual growth.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border rounded-lg shadow-lg">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <h3 className="text-xl font-bold">Abdullah Raji Al Ameer</h3>
            <p className="text-gray-600">Chief Content Officer</p>
          </div>
          <div className="text-center p-4 border rounded-lg shadow-lg">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <h3 className="text-xl font-bold">Abdullah Qaasim</h3>
            <p className="text-gray-600">Software Developer</p>
          </div>
          <div className="text-center p-4 border rounded-lg shadow-lg">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <h3 className="text-xl font-bold">Roqeeb Yusuf</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </div>
    </div>
  );
};

export default About;
