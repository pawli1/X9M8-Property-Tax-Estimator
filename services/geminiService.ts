import { GoogleGenAI, Type } from "@google/genai";
import { GeminiInsightResponse } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const fetchTaxInsights = async (
  county: string,
  homeValue: number,
  additionalContext: string = ""
): Promise<GeminiInsightResponse> => {
  try {
    const ai = getAiClient();
    
    const prompt = `
      You are an expert New York State property tax consultant for the 'X9M8 Property Tax Estimator' app.
      
      The user is inquiring about a property in ${county} with an estimated market value of $${homeValue.toLocaleString()}.
      ${additionalContext ? `User context: ${additionalContext}` : ''}

      Please provide a structured analysis containing:
      1. A detailed analysis of tax trends in this specific county (trends, reassessments, or unique village tax situations).
      2. A list of 3 specific actionable tips to lower this tax bill (e.g., grievance, challenging assessment).
      3. A list of likely exemptions (e.g., STAR, Enhanced STAR, Veterans, Senior) applicable in NY State for this area.

      Keep the tone professional, helpful, and concise.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "Detailed analysis of the tax situation." },
            tips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Actionable tips."
            },
            exemptions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of applicable exemptions."
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeminiInsightResponse;
    }
    
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      analysis: "Unable to retrieve real-time insights at this moment. Please try again later.",
      tips: ["Check local assessor's office", "Look into STAR program"],
      exemptions: ["Basic STAR"]
    };
  }
};
