import { GoogleGenerativeAI, Schema, SchemaType } from "@google/generative-ai";

export async function useGemini(apiKey: string) {
  const genAi = new GoogleGenerativeAI(apiKey);

  const schema = {
    description: "List of Questions",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        question: {
          type: SchemaType.STRING,
          description: "Question",
          nullable: false,
        },
        options: {
          type: SchemaType.ARRAY,
          minItems: 4,
          maxItems: 4,
          items: {
            type: SchemaType.STRING,
            description: "Each option must be concise (max 150 characters)",
            maxLength: 150,
            nullable: false,
          },
        },
        correct_answer: {
          type: SchemaType.STRING,
          description: "Correct option (concise, max 150 characters)",
          maxLength: 150,
          nullable: false,
        },
      },
      required: ["question", "options", "correct_answer"],
    },
  };

  const model = genAi.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema as Schema,
    },
  });

  return model;
}
