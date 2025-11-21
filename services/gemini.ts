import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from '../types';

// Initialize the client
// Note: In a real production app, ensure API_KEY is not exposed to the client if possible,
// or use a proxy. For this demo, we use process.env as requested.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey: apiKey });

export const evaluateEssayAnswer = async (question: string, answer: string): Promise<AIResponse> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock response.");
    return {
        score: 0,
        feedback: "عذراً، لم يتم إعداد مفتاح API الخاص بالذكاء الاصطناعي. يرجى التحقق من الإعدادات."
    };
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      أنت أستاذ تاريخ متخصص في فكر ابن خلدون.
      قم بتقييم إجابة الطالب التالية بناءً على السؤال المقدم.
      
      السؤال: ${question}
      إجابة الطالب: ${answer}
      
      المطلوب:
      1. درجة من 10 (رقم صحيح).
      2. ملاحظات موجزة ومفيدة باللغة العربية توضح صحة الإجابة أو الخطأ فيها.
      
      قم بإرجاع النتيجة بتنسيق JSON فقط.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER },
                feedback: { type: Type.STRING }
            }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const result = JSON.parse(text) as AIResponse;
    return result;

  } catch (error) {
    console.error("Error evaluating essay:", error);
    return {
      score: 0,
      feedback: "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى لاحقاً."
    };
  }
};
