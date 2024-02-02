import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from "../helpers/imageHelper";
import UploadSection from "./Uploader/Uploader";
import { useNavigate } from "react-router-dom";
import prompt from "@/assets/prompt";

const SpeciesInfo = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [imageInlineData, setImageInlineData] = useState("");
  const [fileName, setFileName] = useState("No Selected File");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch((e) => console.log(e));

    fileToGenerativePart(file).then((image) => {
      setImageInlineData(image);
    });
  };

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([prompt, imageInlineData]);
    const response = await result.response;
    const text = await response.text();

    try {
      // Attempt to parse JSON directly
      const jsonData = JSON.parse(text);
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Handle the case where JSON is enclosed in ```json {response} ``` (rare case)
        const startIndex = text.indexOf("{");
        const endIndex = text.lastIndexOf("}");
        const jsonData = JSON.parse(text.substring(startIndex, endIndex + 1));
        return jsonData;
      } else {
        // Handle other types of errors
        console.error("Error parsing JSON:", error);
      }
    }
  }

  const handleClick = async () => {
    const aiResponse = await run(); // Call run and await response
    navigate("/results", { state: { aiResponse, image } }); // Navigate with response
  };

  return (
    <div className="mt-8">
      <UploadSection
        fileName={fileName}
        setFileName={setFileName}
        setImage={setImage}
        handleImageChange={handleImageChange}
        handleClick={handleClick}
        image={image}
      />
      {/* {image && (
        <img src={image} className="mt-4 mx-auto min-w-300 min-h-400" />
      )} */}
      <div className="flex justify-center items-center">
      <button
        onClick={handleClick}
        className="search-button bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Search
      </button>
      </div>
    </div>
  );
};

export default SpeciesInfo;
