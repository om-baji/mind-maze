import { GoogleGenerativeAI, Schema, SchemaType } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

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

export const model = genAi.getGenerativeModel({
    model : "gemini-2.0-flash",
    generationConfig : {
        responseMimeType : "application/json",
        responseSchema : schema as Schema
    }
});


// const prompt = `Give me 10 very advanced, core and really very challenging questions in Computer Science domain.`

// const res = await model.generateContent(prompt);

// console.log(res.response.text())