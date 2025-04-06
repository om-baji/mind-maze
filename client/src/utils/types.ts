export type selectDataType <T, U> = {
    title: T,
    topics: U[]
}

export type quizType = {
    timeLimit : number,
    numQuestions: string,
    subject: string;
    questions : questionType[];
    attemptId : string
}

export type questionType = {
    question : string,
    options : string[],
    correct_answer : string;
}

export type metadata = {
    id : string,
    email : string,
    name? : string,
}

export type UserMap = {
    index : number,
    answer : string
}