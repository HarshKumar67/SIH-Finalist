import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";
import { MdDirectionsRun } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Display = () => {
  const navigate = useNavigate();
  const { images } = useContext(ImageContext);

  const handleButtonClick = (image) => {
    navigate("/genratedImage", { state: { image } }); // Navigate and pass the image data
  };

  return (
    <div className="min-h-screen overflow-y-scroll bg-gradient-to-br from-[#3b82f6] via-purple-500 to-[#8b5cf6] flex flex-col items-center">
      {/* Title */}
      <h1 className="text-white text-center text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 py-2 px-10 rounded-lg shadow-lg tracking-wide mt-4">
        UPLOADED IMAGES
      </h1>

      {/* Images Grid */}
      <div className="flex flex-wrap gap-x-6 justify-center mt-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-[270px] w-[220px] bg-white rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center group"
          >
            {/* Image */}
            <img
              src={image.url}
              alt={image.name}
              className="w-[200px] h-[200px] object-cover rounded-lg transition-all duration-300 group-hover:rotate-6"
              onClick={() => handleButtonClick(image)}
            />

            {/* Button */}
            <button
              className="text-black bg-yellow-400 absolute bottom-12 right-5 py-1 px-2 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex items-center justify-center hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 z-10"
              onClick={() => handleButtonClick(image)}
            >
              <MdDirectionsRun className="text-xl mr-1" />
              <span className="text-sm font-bold">TEST</span>
            </button>

            {/* Image Name */}
            <p className="absolute bottom-2 w-[200px] text-center text-sm font-medium bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white py-1 rounded-md shadow-md">
              {image.name}
            </p>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-400 via-purple-500 to-blue-400 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;