import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from "../helpers/imageHelper";
import "./SpeciesInfo.css"; // Import your CSS file

const SpeciesInfo = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const [image, setImage] = useState("");
  const [imageInlineData, setImageInlineData] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const prompt = `Analyze the plant/animal in the uploaded image and provide the following information in JSON format: - Most likely species (scientific name, common names, brief description(in list), confidence level) \n - Overall appearance \n - Distinguishing features \n - Habitat \n - Geographic location \n - Links to additional resources (as title and link)(Wikipedia, species databases, field guides)`;

  async function run() {
    setLoading(true);
    setResponse("");
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([prompt, imageInlineData]);
    const response = await result.response;
    const text = await response.text();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const jsonText = text.substring(jsonStart, jsonEnd + 1);
    setResponse(JSON.parse(jsonText));
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
    <div className="species-info-container">
      <div className="upload-section">
        <input type="file" onChange={(e) => handleImageChange(e)} />
        <button onClick={() => handleClick()}>Search</button>
      </div>
      {image && <img src={image} className="uploaded-image" />}

      {loading && !aiResponse && <p className="loading-message">Loading ...</p>}

      {aiResponse && (
        <div className="response-container">
          <div className="species-info">
            <h2>Most Likely Species:</h2>
            <p>
              Scientific Name: {aiResponse.most_likely_species.scientific_name}
            </p>
            <p>
              Common Names:{" "}
              {aiResponse.most_likely_species.common_names.join(", ")}
            </p>
            <p>Brief Description:</p>
            <ul>
              {aiResponse.most_likely_species.brief_description.map(
                (desc, index) => (
                  <li key={index}>{desc}</li>
                )
              )}
            </ul>
            <p>
              Confidence Level:{" "}
              {aiResponse.most_likely_species.confidence_level}
            </p>
            <h2>Overall Appearance:</h2>
            <p>{aiResponse.overall_appearance}</p>

            <h2>Distinguishing Features:</h2>
            <p>{aiResponse.distinguishing_features}</p>

            <h2>Habitat:</h2>
            <p>{aiResponse.habitat}</p>

            <h2>Geographic Location:</h2>
            <p>{aiResponse.geographic_location}</p>

            <h2>Links to Additional Resources:</h2>
            <ul>
              {aiResponse.links_to_additional_resources.map(
                (resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.title}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeciesInfo;
