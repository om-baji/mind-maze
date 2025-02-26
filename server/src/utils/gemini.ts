import { GoogleGenerativeAI, Schema, SchemaType } from "@google/generative-ai";

export async function useGemini(apiKey : string) {
    const genAi = new GoogleGenerativeAI(apiKey);

    const schema = {
        description : "List of Questions",
        type : SchemaType.ARRAY,
        items : {
            type : SchemaType.OBJECT,
            properties : {
                question : {
                    type : SchemaType.STRING,
                    description : "Question",
                    nullable : false
                },
                options : {
                    type : SchemaType.ARRAY,
                    items : {
                        type : SchemaType.STRING,
                        description : "Option",
                        nullable : false
                    }
                },
                correct_answer : {
                    type : SchemaType.STRING,
                    description : "correct option",
                    nullable : false
                }
            },
            required : ["question","options","correct_answer"]
        }
    }
    
    const model = genAi.getGenerativeModel({
        model : "gemini-2.0-flash",
        generationConfig : {
            responseMimeType : "application/json",
            responseSchema : schema as Schema
        }
    });

    return model;
}