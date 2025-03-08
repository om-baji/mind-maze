import { SyncParseReturnType } from "zod"

export type correctQuiz = {
    attemptId : string,
    records : Map<number,string>
}

export type Question = {
    question : string,
    options : string[],
    correct_option : string
}