import { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Replace with your actual API key
// eslint-disable-next-line no-undef
const API_KEY = process.env.API_KEY;

const useGenerateSpeciesInfo = async (imageFile) => {
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageFile) return;

    const generateSpeciesInfo = async () => {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const generationConfig = {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 4096,
        };

        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];

        const parts = [
          {
            text: "input: Describe the plant/animal in the uploaded image:\n* Overall appearance: Size, shape, color, patterns, textures.\n* Distinguishing features: Unique characteristics, markings, body parts.\n* Habitat: Where the image was taken, surrounding environment.\n\nGenerate a markdown-formatted summary of the most likely species, including:\n* Scientific name and common names.\n* Brief description: Key characteristics and habitat preferences.\n* Confidence level: Estimate the accuracy of the identification.\n\nProvide links to additional resources for further learning:\n* Wikipedia articles.\n* Species-specific databases.\n* Field guides and nature documentaries.\n​",
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              // eslint-disable-next-line no-undef
              data: Buffer.from(imageFile).toString("base64"), // Assuming imageFile is a File object
            },
          },
          { text: "​" },
          { text: "output:" },
        ];

        const result = await model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig,
          safetySettings,
        });

        const response = result.response;
        setOutput(response.text());
      } catch (error) {
        setError(error);
      }
    };

    generateSpeciesInfo();
  }, [imageFile]);

  return { output, error };
};

export default useGenerateSpeciesInfo;
