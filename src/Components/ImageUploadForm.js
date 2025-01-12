import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import { MdOutlineCloudUpload, MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";

function ImageUploadForm() {
  const Navigate = useNavigate();
  const { images, setImages, setOgcv, setGencv } = useContext(ImageContext);
  const [count, setCount] = useState(0);
  const [csvData, setCsvData] = useState([]);

  // States to track upload status
  const [pathPlanningDone, setPathPlanningDone] = useState(false);
  const [allottedUploaded, setAllottedUploaded] = useState(false);
  const [measuredUploaded, setMeasuredUploaded] = useState(false);
  const [imagesUploaded, setImagesUploaded] = useState(false);

  // State to track current step
  const [currentStep, setCurrentStep] = useState(1);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setCsvData(result.data);
          setOgcv(result.data);
          setAllottedUploaded(true); // Mark as uploaded
        },
      });
    }
  };

  const handleFileChangeGen = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setCsvData(result.data);
          setGencv(result.data);
          setMeasuredUploaded(true); // Mark as uploaded
        },
      });
    }
  };

  const handleFolderInput = (event) => {
    const selectedFiles = event.target.files;
    const files = Array.from(selectedFiles);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setCount(files.length);
    const imageUrls = imageFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));
    setImages(imageUrls);
    setImagesUploaded(true); // Mark as uploaded
    Navigate("/images");
  };

  const nextStep = () => {
    if (currentStep === 1 && pathPlanningDone) {
      setCurrentStep(2);
    } else if (currentStep === 2 && allottedUploaded) {
      setCurrentStep(3);
    } else if (currentStep === 3 && measuredUploaded) {
      setCurrentStep(4);
    }
  };

  return (
    <div className="w-full h-screen text-white p-8 flex flex-col justify-center items-center gap-3 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
      {/* Step 1: Path Planning Button */}
      {currentStep === 1 && (
        <div className="flex flex-col items-center gap-6">
          <a
            href="https://flylitchi.com/hub"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl rounded-xl shadow-lg max-w-[60vw] transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-xl ${pathPlanningDone ? "bg-green-500 text-white" : "bg-[#fbbf24] text-black hover:bg-[#f59e0b]"}`}
            onClick={() => setPathPlanningDone(true)}
          >
            <div className="flex gap-4 justify-center items-center text-lg">
              Path Planning
            </div>
          </a>
        </div>
      )}

      {/* Step 2: Upload Allotted CSV */}
      {currentStep === 2 && (
        <div className="flex flex-col items-center gap-6">
          <label
            className={`inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl rounded-xl shadow-lg max-w-[60vw] transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-xl ${allottedUploaded ? "bg-green-500 text-white" : "bg-[#fbbf24] text-black hover:bg-[#f59e0b]"}`}
          >
            <div className="flex gap-4 justify-center items-center text-lg">
              <FaRegFileExcel size={30} />
              Upload Allotted CSV
            </div>
            <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      )}

      {/* Step 3: Upload Measured CSV */}
      {currentStep === 3 && (
        <div className="flex flex-col items-center gap-6">
          <label
            className={`inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl rounded-xl shadow-lg max-w-[60vw] transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-xl ${measuredUploaded ? "bg-green-500 text-white" : "bg-[#fbbf24] text-black hover:bg-[#f59e0b]"}`}
          >
            <div className="flex gap-4 justify-center items-center text-lg">
              <FaRegFileExcel size={30} />
              Upload Measured CSV
            </div>
            <input type="file" accept=".csv" className="hidden" onChange={handleFileChangeGen} />
          </label>
        </div>
      )}

      {/* Step 4: Upload Images Folder */}
      {currentStep === 4 && (
        <div className="flex flex-col items-center gap-6">
          <label
            className={`inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl rounded-xl shadow-lg max-w-[60vw] transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-xl ${imagesUploaded ? "bg-green-500 text-white" : "bg-[#fbbf24] text-black hover:bg-[#f59e0b]"}`}
          >
            <div className="flex gap-4 justify-center items-center text-lg">
              <MdOutlineDriveFolderUpload size={30} />
              Upload Images Folder
            </div>
            <input
              type="file"
              multiple
              webkitdirectory="true" // Enables folder upload
              onChange={handleFolderInput}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Next Step Button */}
      {currentStep < 4 && (
        <button
          onClick={nextStep}
          className="mt-6 px-6 py-3 text-lg font-bold text-black bg-[#fbbf24] rounded-xl shadow-lg hover:scale-105 hover:shadow-xl hover:bg-[#f59e0b] transition-all duration-300 ease-in-out"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default ImageUploadForm;
