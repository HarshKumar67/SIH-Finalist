import React, { createContext, useState } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading,setLoading] = useState(false);
  const [ogcv,setOgcv] = useState(null);
  const [gencv,setGencv] = useState(null);

  return (
    <ImageContext.Provider value={{ images, setImages,loading,setLoading ,ogcv,setOgcv,gencv,setGencv}}>
      {children}
    </ImageContext.Provider>
  );
};
