import { GoogleGenAI } from "@google/genai";
import { JoyAlbum } from "../types";

export const generateJoySummary = async (albums: JoyAlbum[]): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("No API Key available");
    return "API Key missing. Cannot generate summary.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Construct a prompt based on the album messages
    const messages = albums
      .filter(a => a.message)
      .map(a => `- "${a.message}" by ${a.author}`)
      .join('\n');

    const prompt = `
      You are an enthusiastic "Chief Joy Officer" for a school network called Uncommon Schools.
      Analyze the following messages posted by staff members in our Joy Collage:

      ${messages}

      Write a short, inspiring, and high-energy 2-3 sentence summary of the "Joy Pulse" of the school right now. 
      Focus on themes of community, student success, and teamwork. Use emojis.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Spreading the joy!";
  } catch (error) {
    console.error("Error generating joy summary:", error);
    return "Could not analyze the joy at this moment, but we know it's there!";
  }
};
