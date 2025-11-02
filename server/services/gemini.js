const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Configure Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.9,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json", // ensures cleaner output
};

/**
 * Generates travel itinerary using Gemini
 * @param {Object} params - User input
 * @param {string} params.destination
 * @param {string} params.interests
 * @param {string} params.season
 * @param {number} params.days
 */
const generateItinerary = async ({ destination, interests, season, days }) => {
  const prompt = `
You are an AI travel guide that creates personalized travel itineraries.

Generate a detailed ${days}-day travel plan for ${destination}.
The user's interests are: ${interests}.
The travel month or season is: ${season}.

Please include:
- A title for the itinerary
- A short introduction paragraph
- A day-wise breakdown with main attractions and short descriptions
- Recommended restaurants or food places (if applicable)
- Local travel tips
- Best time to visit (summary)
- Total estimated budget range in USD or INR

Return the response in **pure JSON** format exactly in this structure:

{
  "title": "string",
  "introduction": "string",
  "destination": "string",
  "days": [
    {
      "day": "Day 1",
      "title": "string",
      "description": "string",
      "places_to_visit": ["place1", "place2"],
      "activities": ["activity1", "activity2"],
      "food_recommendations": ["restaurant1", "restaurant2"]
    }
  ],
  "best_time_to_visit": "string",
  "travel_tips": ["tip1", "tip2"],
  "estimated_budget": "string"
}

Rules:
1. The output must be **valid JSON** (parsable by JSON.parse()).
2. No explanations, markdown, or extra text.
3. Keep the tone friendly, helpful, and travel-oriented.
`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig,
  });

  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Invalid JSON from Gemini:", text);
    throw new Error("Gemini returned invalid JSON");
  }
};

module.exports = { generateItinerary };
