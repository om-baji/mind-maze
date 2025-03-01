export type selectDataType <T, U> = {
    title: T,
    topics: U[]
}

export type quizType = {
    timeLimit : number,
    numQuestions: string,
    subject: string;
}
