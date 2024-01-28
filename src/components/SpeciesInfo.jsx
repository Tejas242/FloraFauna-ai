import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from "../helpers/imageHelper";
import UploadSection from "./Uploader/Uploader";
import AIResponse from "./AiResponse/AiResponse";
import prompt from "../assets/prompt";

const SpeciesInfo = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const [image, setImage] = useState("");
  const [imageInlineData, setImageInlineData] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("No Selected File");

  async function run() {
    setLoading(true);
    setResponse("");
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([prompt, imageInlineData]);
    const response = await result.response;
    const text = await response.text();

    try {
      // Attempt to parse JSON directly
      const jsonData = JSON.parse(text);
      console.log(jsonData);
      setResponse(jsonData);
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Handle the case where JSON is enclosed in ```json {response} ``` (rare case)
        const startIndex = text.indexOf("{");
        const endIndex = text.lastIndexOf("}");
        const jsonText = text.substring(startIndex, endIndex + 1);
        console.log(JSON.parse(jsonText));
        setResponse(JSON.parse(jsonText));
      } else {
        // Handle other types of errors
        console.error("Error parsing JSON:", error);
      }
    }

    setLoading(false);
  }

  const handleClick = () => {
    run();
  };

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

  return (
    <div className="p-8">
      <UploadSection
        fileName={fileName}
        setFileName={setFileName}
        setImage={setImage}
        handleImageChange={handleImageChange}
        handleClick={handleClick}
        image={image}
      />
      {image && <img src={image} className="mt-4 mx-auto" />}
      <AIResponse aiResponse={aiResponse} loading={loading} />
    </div>
  );
};

export default SpeciesInfo;
