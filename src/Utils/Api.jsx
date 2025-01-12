import axios from "axios";

export const FetchData = async (image, setLoading) => {
  if (!image.file) {
    alert("Please select a file!");
    return;
  }

  const formData = new FormData();
  formData.append("image", image.file);
  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/genrateImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error.message);
  } finally {
    setLoading(false);
  }
};
