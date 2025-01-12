import React from "react";

function ContactUs() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      img: "https://via.placeholder.com/150",
      email: "john.doe@example.com",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    {
      name: "Jane Smith",
      role: "Chief Technology Officer",
      img: "https://via.placeholder.com/150",
      email: "jane.smith@example.com",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
    {
      name: "Alice Brown",
      role: "Marketing Head",
      img: "https://via.placeholder.com/150",
      email: "alice.brown@example.com",
      linkedin: "https://www.linkedin.com/in/alicebrown",
    },
    {
      name: "David Lee",
      role: "Operations Manager",
      img: "https://via.placeholder.com/150",
      email: "david.lee@example.com",
      linkedin: "https://www.linkedin.com/in/davidlee",
    },
    {
      name: "Emma Wilson",
      role: "Frontend Developer",
      img: "https://via.placeholder.com/150",
      email: "emma.wilson@example.com",
      linkedin: "https://www.linkedin.com/in/emmawilson",
    },
    {
      name: "Michael Carter",
      role: "Backend Developer",
      img: "https://via.placeholder.com/150",
      email: "michael.carter@example.com",
      linkedin: "https://www.linkedin.com/in/michaelcarter",
    },
    {
      name: "Sophia Moore",
      role: "UI/UX Designer",
      img: "https://via.placeholder.com/150",
      email: "sophia.moore@example.com",
      linkedin: "https://www.linkedin.com/in/sophiamoore",
    },
    {
      name: "Ethan Davis",
      role: "DevOps Engineer",
      img: "https://via.placeholder.com/150",
      email: "ethan.davis@example.com",
      linkedin: "https://www.linkedin.com/in/ethandavis",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 transition duration-500 hover:text-gray-200 hover:shadow-lg transition-shadow duration-300">
            Contact Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed hover:text-gray-300">
            Have questions or want to connect? We'd love to hear from you. Reach
            out to us today.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-4xl font-bold mb-6 text-indigo-400">
            Get In Touch
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="col-span-1">
              <label className="block text-sm mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email Input */}
            <div className="col-span-1">
              <label className="block text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Subject Input */}
            <div className="col-span-2">
              <label className="block text-sm mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Message Input */}
            <div className="col-span-2">
              <label className="block text-sm mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-2xl"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-12 md:py-20 shadow-lg transition duration-300 hover:shadow-2xl bg-black">
        <h2 className="text-4xl font-bold mb-6 text-center text-indigo-400 transition duration-300 hover:text-gray-300">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 shadow-lg transition duration-300 hover:shadow-2xl ">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-800 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full shadow-lg transition duration-300 hover:scale-110"
              />
              <h3 className="text-xl font-semibold mt-4 transition duration-300 hover:text-indigo-400">
                {member.name}
              </h3>
              <p className="text-sm text-gray-400 shadow-lg transition duration-300 hover:shadow-2xl">{member.role}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-300">
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-indigo-400 transition duration-300"
                  >
                    {member.email}
                  </a>
                </p>
                <p className="text-sm text-gray-300">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition duration-300"
                  >
                    LinkedIn Profile
                  </a>
                </p>
              </div>
              {/* Social Media Icons */}
              <div className="flex justify-center mt-4 space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-500 transition duration-300"
                >
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition duration-300"
                >
                  <i className="fab fa-facebook fa-lg"></i>
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600 transition duration-300"
                >
                  <i className="fab fa-whatsapp fa-lg"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;