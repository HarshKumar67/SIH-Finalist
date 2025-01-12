import React, { useContext, useEffect, useState } from "react";
import { FetchData } from "../Utils/Api";
import { useLocation } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import TableComponent from "./TableComponent";
import "./loader.css";

const GeneratedImage = () => {
  const { loading, setLoading, ogcv, gencv } = useContext(ImageContext);
  const location = useLocation();
  const [result, setResult] = useState(null);
  const { image } = location.state || {};
  const [ogData, setOgData] = useState(null);
  const [genData, setGenData] = useState(null);
  const [actualArea, setActualArea] = useState(null);
  const [apercentageError, setApercentageError] = useState(null);
  const [calculatedArea, setCalculatedArea] = useState(null);
  const [areaFlag, setAreaFlag] = useState(null);
  const [actualHeight, setActualHeight] = useState(null);
  const [hpercentageError, setHpercentageError] = useState(null);
  const [measuredHeight, setMeasuredHeight] = useState(null);
  const [heightFlag, setHeightFlag] = useState(null);
  const [pixelCount, setPixelCount] = useState(null);
  
  // New state to toggle the dashboard images visibility
  const [showImages, setShowImages] = useState(false);

  function getData(cvData) {
    const name1 = image.name.replace(/\.jpg$/i, "");
    return cvData.filter((house) => house.House.includes(name1));
  }

  useEffect(() => {
    const og = getData(ogcv);
    const gen = getData(gencv);
    setOgData(og);
    setGenData(gen);
  }, [ogcv, gencv, image]);

  useEffect(() => {
    if (ogData && ogData.length > 0) {
      const actualAreaValue = ogData[0]["Actual Area (sq ft)"];
      const calculatedAreaValue = 305.21;
      const areaError = ((calculatedAreaValue - actualAreaValue) / actualAreaValue) * 100;
      const areaFlagValue = Math.abs(areaError) > 10;

      setActualArea(actualAreaValue);
      setCalculatedArea(calculatedAreaValue);
      setApercentageError(areaError.toFixed(2));
      setAreaFlag(areaFlagValue ? "true" : "false");

      const actualHeightValue = ogData[0]["Actual Height (ft)"];
      const measuredHeightValue = genData[0]["Measured Height (ft)"];

      const heightError = ((measuredHeightValue - actualHeightValue) / actualHeightValue) * 100;
      const heightFlagValue = Math.abs(heightError) > 10;

      setActualHeight(actualHeightValue);
      setMeasuredHeight(measuredHeightValue);
      setHpercentageError(heightError.toFixed(2));
      setHeightFlag(heightFlagValue ? "true" : "false");
    }
  }, [ogData]);

  useEffect(() => {
    const fetchGeneratedImage = async () => {
      const response = await FetchData(image, setLoading);
      setResult(response);

      if (response && response.result && response.result.segmented_image_base64) {
        const img = new Image();
        img.src = `data:image/png;base64,${response.result.segmented_image_base64}`;
        img.onload = () => {
          setPixelCount(img.width * img.height);
        };
      }
    };
    fetchGeneratedImage();
  }, [image]);

  const handleDownloadReport = () => {
    const reportContent = `Building Report\n\nOriginal Image: ${image.name}\nPixel Count: ${pixelCount || "Loading..."}\n\n--- Area Metrics ---\nActual Area (sq ft): ${actualArea || "Loading..."}\nCalculated Area (sq ft): ${calculatedArea || "Loading..."}\n%Error: ${apercentageError || "Loading..."}\nFlag: ${areaFlag || "Loading..."}\n\n--- Height Metrics ---\nActual Height (ft): ${actualHeight || "Loading..."}\nMeasured Height (ft): ${measuredHeight || "Loading..."}\n%Error: ${hpercentageError || "Loading..."}\nFlag: ${heightFlag || "Loading..."}`;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Building_Report_${image.name.replace(/\.[^/.]+$/, "")}.txt`;
    link.click();
  };

  const areacomparisonHeaders = [
    "Building Metrics",
    "Actual Area (sq ft)",
    "Calculated Area (sq ft)",
    "%Error",
    "Flag",
    "3D Model Check",
  ];

  const heightcomparisonHeaders = [
    "Building Metrics",
    "Actual Height (ft)",
    "Measured Height (ft)",
    "%Error",
    "Flag",
    "3D Model Check",
  ];

  const AreaComparisonData = [
    {
      "Building Metrics": "Area",
      "Actual Area (sq ft)": actualArea || "Loading...",
      "Calculated Area (sq ft)": calculatedArea || "Loading...",
      "%Error": apercentageError || "Loading...",
      Flag: areaFlag || "Loading...",
      "3D Model Check": areaFlag === "true" ? (
        <a
          href="https://poly.cam"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Check Site
        </a>
      ) : "N/A",
    },
  ];

  const HeightComparisonData = [
    {
      "Building Metrics": "Height",
      "Actual Height (ft)": actualHeight || "Loading...",
      "Measured Height (ft)": measuredHeight || "Loading...",
      "%Error": hpercentageError || "Loading...",
      Flag: heightFlag || "Loading...",
      "3D Model Check": heightFlag === "true" ? (
        <a
          href="https://poly.cam"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline decoration-white"
        >
          Check Site
        </a>
      ) : "N/A",
    },
  ];

  // Handle Dashboard button click
  const handleDashboardClick = () => {
    setShowImages(!showImages);
  };

  return (
    <div className="bg-gradient-to-br from-[#3b82f6] to-purple-600 p-10 h-fit">
      {result ? (
        <div className="flex flex-col items-center gap-10">
          <div className="flex justify-evenly w-full gap-10">
            <div className="flex flex-col border-2 rounded-lg h-fit shadow-lg bg-white w-[48%]">
              <h2 className="text-[#F72C5B] text-center text-xl font-extrabold p-2">Original Image</h2>
              <img src={image.url} alt="Original" className="h-96 w-full object-contain rounded-b-lg" />
              <div className="p-4 text-black">
                <p><strong>House:</strong> {ogData?.[0]?.House || "Loading..."}</p>
                <p><strong>Coordinates:</strong> {ogData?.[0]?.Coordinates || "Loading..."}</p>
                <p><strong>Actual Height (ft):</strong> {ogData?.[0]?.["Actual Height (ft)"] || "Loading..."}</p>
                <p><strong>Actual Area (sq ft):</strong> {ogData?.[0]?.["Actual Area (sq ft)"] || "Loading..."}</p>
              </div>
            </div>
            <div className="flex flex-col border-2 rounded-lg h-fit shadow-lg bg-white w-[48%]">
              <h2 className="text-[#F72C5B] text-center text-xl font-extrabold p-2">Segmented Image</h2>
              <img
                src={`data:image/png;base64,${result.result.segmented_image_base64}`}
                alt="Segmented"
                className="h-96 w-full object-contain rounded-b-lg"
              />
              <div className="p-4 text-black">
                <p><strong>Measured Height (ft):</strong> {genData?.[0]?.["Measured Height (ft)"] || "Loading..."}</p>
                <p><strong>Calculated Area (sq ft):</strong> {calculatedArea || "Loading..."}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-white font-bold">
            <p>Pixel Count of Segmented Image: {pixelCount ? pixelCount : "Loading..."}</p>
          </div>

          <h2 className="text-xl font-bold mb-4 text-white text-center underline decoration-yellow-300">
            House Details
          </h2>
          <div className="flex justify-evenly w-full gap-10">
            <div>
              <TableComponent
                headers={["House", "Coordinates", "Actual Height (ft)", "Actual Area (sq ft)"]}
                data={ogData}
                className="text-black border-black"
              />
            </div>
            <div>
              <TableComponent
                headers={["House", "Coordinates", "Measured Height (ft)", "Calculated Area (sq ft)"]}
                data={genData}
                className="text-black border-black"
              />
            </div>
          </div>
          {ogData && genData && (
            <div className="flex flex-col gap-10">
              <TableComponent headers={areacomparisonHeaders} data={AreaComparisonData} className="table-comparison text-black border-black" />
              <TableComponent headers={heightcomparisonHeaders} data={HeightComparisonData} className="table-comparison text-black border-black" />
            </div>
          )}
        </div>
      ) : (
        <div className="loader"></div>
      )}

      {/* Dashboard Button with Images toggle */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleDashboardClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <div className="flex items-center">
            <span className="ml-2">Dashboard</span>
          </div>
        </button>
      </div>

      {/* Display Images when dashboard is clicked */}
      {showImages && (
        <div className="flex justify-center gap-10 mt-8">
          <img src="11.jpg" alt="Image 1" className="h-64" />
          <img src="12.jpg" alt="Image 2" className="h-64" />
        </div>
      )}

      <button
        onClick={handleDownloadReport}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 mt-10"
      >
        Download Report
      </button>
    </div>
  );
};

export default GeneratedImage;
