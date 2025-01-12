import React from 'react';
import { Link } from 'react-router-dom';
import TableComponent from './TableComponent';
function ladingPage() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans">
      {/* Header */}


      {/* Hero Section */}
<section className="h-screen text-white flex flex-col items-center justify-center relative pt-16">
  {/* Image at the top, covering full width and 30% transparent */}
  <div className="w-full absolute top-0 left-0 right-0 bottom-0 z-0">
    <img
      src="/drone-flying-city-with-words-drones-2.jpg" // Ensure the image path is correct
      className="w-full h-[calc(100vh-4rem-16px)] object-cover opacity-30 -mt-10" // Consistent dimensions and styles
    />
  </div>
  
  {/* Text overlaying the image */}
  <div className="relative z-10 flex flex-col items-center text-center px-4 py-16">
    <h2 className="text-5xl font-bold mb-4">Empowering the Future with Drones</h2>
    <p className="text-3xl mb-6">Explore the Inspection Insights</p>
    
    

    <Link to="/model">
      <button className="bg-[rgb(234,_179,_8)] hover:bg-[rgb(234,_140,_0)] text-white py-3 px-8 rounded-full mt-8">
        Check out
      </button>
    </Link>

  </div>
</section>



      {/* About Section */}
      <section id="about" className="py-16 px-6 text-center bg-gray-100">
        <h2 className="text-4xl font-semibold mb-6">About Us</h2>
        <p className="text-lg">At Aerial Insight, we leverage advanced drone technology to assess the structural integrity and strength of buildings. Our innovative approach allows for detailed inspections of hard-to-reach areas, providing real-time data on potential weaknesses, cracks, or structural vulnerabilities.</p>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 text-center">
        <h2 className="text-4xl font-semibold mb-10">Services</h2>
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Drone-Based Structural Inspections</h3>
            <p>Our drones perform detailed aerial inspections to identify structural weaknesses, cracks, and other potential issues in buildings. This service allows for fast, accurate, and non-invasive assessments of building strength, including difficult-to-reach areas like rooftops and facades..</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Real-Time Data Analysis</h3>
            <p>We provide real-time data processing and analysis from drone inspections, offering immediate insights into the structural integrity of a building. Our AI-driven analytics help detect issues such as material degradation, corrosion, or shifts in load-bearing components.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Periodic Monitoring and Reporting</h3>
            <p>We offer ongoing monitoring services to track the structural health of buildings over time. Our periodic drone inspections and reports help ensure that your building remains strong and safe, reducing the risk of future failures or costly repairs.</p>
          </div>
        </div>
      </section>

      
            {/* Contact Section */}
            <section
        id="contact"
        className="py-16 px-6 text-center"
        style={{
          background: "linear-gradient(to right, #3b82f6, #8b5cf6)", // Gradient from blue to purple
        }}
      >
        <h2 className="text-4xl font-semibold mb-6 text-white">Contact Us</h2>
        <p className="text-white text-lg">
          Interested in partnering or learning more? Reach out to us via email:{' '}
          <a
            href="mailto:info@dronestartups.com"
            className="text-yellow-300 hover:text-yellow-400"
          >
            info@droneMaster.com
          </a>
        </p>
        <div className="mt-8">
          <button className="bg-yellow-400 text-black py-3 px-8 rounded-full hover:bg-yellow-500">
            Send Message
          </button>
        </div>
      </section>



    </div>
  );
}

export default ladingPage;