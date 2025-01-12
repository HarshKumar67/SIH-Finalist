import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
            About Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed transition-opacity duration-300 hover:opacity-80">
            Discover who we are and what drives us to deliver exceptional
            results every day. Our mission is to create a better tomorrow by
            combining innovation and creativity.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Our Mission"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Text Section */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-indigo-400 transition-transform duration-300 hover:scale-105">
              Our Story
            </h2>
            <p className="text-lg leading-relaxed mb-4 hover:opacity-80 transition-opacity duration-300">
              Founded with a passion for excellence, our journey began with a
              simple goal: to make a difference in people's lives. Over the
              years, we've grown into a team of dedicated professionals who are
              committed to pushing boundaries and achieving greatness.
            </p>
            <p className="text-lg leading-relaxed hover:opacity-80 transition-opacity duration-300">
              Whether it's through innovative solutions or unparalleled customer
              experiences, we strive to set the standard in everything we do.
              Our team believes in the power of collaboration, creativity, and
              integrity to drive meaningful change.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-indigo-400 hover:scale-105 transition-transform duration-300">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Integrity", color: "text-pink-400" },
              { title: "Innovation", color: "text-indigo-400" },
              { title: "Teamwork", color: "text-purple-400" },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <h3
                  className={`text-2xl font-bold mb-4 ${value.color} transition-opacity duration-300 hover:opacity-90`}
                >
                  {value.title}
                </h3>
                <p className="text-lg leading-relaxed hover:opacity-80 transition-opacity duration-300">
                  {value.title === "Integrity"
                    ? "We believe in doing the right thing, always. Our actions are guided by honesty, fairness, and transparency."
                    : value.title === "Innovation"
                    ? "Creativity fuels our progress. We constantly seek new ideas and solutions to stay ahead in a fast-changing world."
                    : "Collaboration is at the heart of everything we do. Together, we achieve more than we ever could alone."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-12 md:py-20">
        <h2 className="text-4xl font-bold mb-6 text-center text-indigo-400 hover:scale-105 transition-transform duration-300">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["John Doe", "Jane Smith", "Alice Brown"].map((name, index) => (
            <div
              key={index}
              className="text-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-xl font-semibold mt-4 hover:text-pink-400 transition-colors duration-300">
                {name}
              </h3>
              <p className="text-sm text-gray-400">
                {index === 0
                  ? "Founder & CEO"
                  : index === 1
                  ? "Chief Technology Officer"
                  : "Marketing Head"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;