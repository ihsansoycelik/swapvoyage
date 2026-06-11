
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Place, FilterState, DailyItinerary } from "../types";
import { ACTIVE_PROFILE } from "./contentProfile";

// Timeouts to prevent freezing
const API_TIMEOUT_MS = 6000; // 6 seconds max for route generation
const IMAGE_GEN_TIMEOUT_MS = 3000; // 3 seconds max for image generation

// Helper: Timeout Wrapper
const withTimeout = <T>(promise: Promise<T>, ms: number, fallbackValue?: T): Promise<T | undefined> => {
  return Promise.race([
    promise,
    new Promise<T | undefined>((resolve) => 
      setTimeout(() => {
        // console.warn(`Operation timed out after ${ms}ms`);
        resolve(fallbackValue);
      }, ms)
    )
  ]);
};

const getFallbackPlaces = (): Place[] => {
  return ACTIVE_PROFILE.fallbackPlaces.map(p => ({
    ...p,
    id: `${p.id}-${Math.random().toString(36).substr(2, 5)}`
  }));
};

// --- Image Generation Service ---
export const generateImage = async (prompt: string): Promise<string | null> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') return null;

  const ai = new GoogleGenAI({ apiKey });
  
  const enhancedPrompt = `
    Professional travel photography of ${prompt}.
    Style: Cinematic, 8k resolution, highly detailed, photorealistic, golden hour lighting, wide angle, national geographic style.
    Content: No tourists, majestic scenery, atmospheric, sharp focus.
  `.trim();

  try {
    const apiCall = ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: enhancedPrompt }]
      },
      config: {
         imageConfig: { aspectRatio: "9:16" }
      }
    });

    const response = await withTimeout<GenerateContentResponse>(apiCall, IMAGE_GEN_TIMEOUT_MS);

    if (!response) return null;

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

// --- Route Optimization Service ---
export const optimizeRoute = async (places: Place[], days: number): Promise<DailyItinerary[]> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

  // Fallback: Simple chunking if no API key
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    return fallbackChunking(places, days);
  }

  const ai = new GoogleGenAI({ apiKey });
  const placeList = places.map(p => `ID: ${p.id}, Name: ${p.name}, Coords: ${p.coordinates?.lat},${p.coordinates?.lng}`).join('\n');
  
  const prompt = `
    I have a list of travel destinations:
    ${placeList}
    
    Please organize these into a ${days}-day itinerary.
    Group them logically by geographical proximity to minimize travel time.
    Return a JSON array of arrays, where the outer array represents days, and inner arrays contain Place IDs.
    Example: [["id1", "id2"], ["id3"]] for 2 days.
  `;

  try {
    const apiCall = ai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
             type: Type.ARRAY,
             items: { type: Type.STRING } // Place IDs
          }
        }
      }
    });

    const response = await withTimeout<GenerateContentResponse>(apiCall, API_TIMEOUT_MS);

    if (!response || !response.text) {
      return fallbackChunking(places, days);
    }

    const dayGroupsIds = JSON.parse(response.text) as string[][];
    
    // Map IDs back to full Place objects
    const itinerary: DailyItinerary[] = dayGroupsIds.map((ids, index) => ({
      day: index + 1,
      places: ids.map(id => places.find(p => p.id === id)).filter((p): p is Place => !!p)
    }));

    // Add any missing places to the last day (safety net)
    const usedIds = new Set(dayGroupsIds.flat());
    const missing = places.filter(p => !usedIds.has(p.id));
    if (missing.length > 0 && itinerary.length > 0) {
      itinerary[itinerary.length - 1].places.push(...missing);
    } else if (missing.length > 0 && itinerary.length === 0) {
       itinerary.push({ day: 1, places: missing });
    }

    return itinerary;

  } catch (e) {
    console.error("Route optim failed", e);
    return fallbackChunking(places, days);
  }
};

const fallbackChunking = (places: Place[], days: number): DailyItinerary[] => {
  const perDay = Math.ceil(places.length / days);
  const result: DailyItinerary[] = [];
  for (let i = 0; i < days; i++) {
    const start = i * perDay;
    const end = start + perDay;
    const chunk = places.slice(start, end);
    if (chunk.length > 0) {
      result.push({ day: i + 1, places: chunk });
    }
  }
  return result;
};


export const fetchHiddenGems = async (existingIds: string[] = [], filters?: FilterState): Promise<Place[]> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    return new Promise((resolve) => setTimeout(() => resolve(getFallbackPlaces()), 500));
  }

  const ai = new GoogleGenAI({ apiKey });
    
  let locationInstruction = "";
  if (filters?.location) {
    if (filters.location.startsWith("COORDS:")) {
      const coords = filters.location.replace("COORDS:", "");
      locationInstruction = `FILTER: User is at ${coords}. ONLY show hidden gems within 200km radius.`;
    } else {
      locationInstruction = `FILTER: Focus strictly on the region/province of "${filters.location}".`;
    }
  }

  let categoryInstruction = "";
  if (filters?.categories && filters.categories.length > 0) {
    categoryInstruction = `FILTER: Strictly match these themes: ${filters.categories.join(', ')}.`;
  }

  const constraintsText = ACTIVE_PROFILE.constraints.map((c, i) => `${i + 1}. ${c}`).join('\n    ');

  const prompt = `
    ${ACTIVE_PROFILE.systemPromptRole}
    ${ACTIVE_PROFILE.basePrompt}
    
    Style Guide:
    - Tone: Sophisticated, intriguing, magazine-style.
    - NO encyclopedic fluff.
    - Focus on sensory details, atmosphere, and "why go now".
    - Content Language: TURKISH.
    
    Constraints:
    ${constraintsText}
    
    ${locationInstruction}
    ${categoryInstruction}
    
    Exclude IDs: ${existingIds.join(', ')}
  `;

  try {
    const apiCall = ai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              location: { type: Type.STRING },
              shortDescription: { type: Type.STRING },
              images: { 
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              prompts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING }
                  }
                }
              },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              coordinates: {
                type: Type.OBJECT,
                properties: {
                  lat: { type: Type.NUMBER },
                  lng: { type: Type.NUMBER }
                },
                required: ["lat", "lng"]
              }
            },
            required: ["id", "name", "location", "shortDescription", "images", "prompts", "tags", "coordinates"]
          }
        }
      }
    });

    const response = await withTimeout<GenerateContentResponse>(apiCall, API_TIMEOUT_MS);
    
    if (!response || !response.text) {
      return getFallbackPlaces();
    }
    
    const cleanedText = response.text.replace(/```json\n?|```\n?/g, '').trim();
    const places = JSON.parse(cleanedText) as Place[];
    return places.map(p => ({
      ...p,
      id: p.id || Math.random().toString(36).substr(2, 9)
    }));

  } catch (error) {
    return getFallbackPlaces();
  }
};
