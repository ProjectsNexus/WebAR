import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CampaignIdea } from "../types";

// In a real app, this would be initialized securely.
// We are using the process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateCampaignStrategy = async (
  productName: string,
  productDescription: string
): Promise<CampaignIdea | null> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key provided for Gemini.");
    return {
      title: "AI Suggestion Unavailable",
      strategy: "Please configure your API key to receive AI-powered marketing strategies.",
      callToAction: "Scan to View"
    };
  }

  const prompt = `
    You are an expert AR Marketing Strategist. 
    I have a product called "${productName}". 
    Description: "${productDescription}".
    
    Suggest a creative WebAR campaign strategy. 
    1. A catchy title for the campaign.
    2. A brief strategy on how to place the AR object (e.g., "Place the chair in your living room to test the fit").
    3. A compelling Call to Action (CTA) button text.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      strategy: { type: Type.STRING },
      callToAction: { type: Type.STRING },
    },
    required: ["title", "strategy", "callToAction"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as CampaignIdea;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
