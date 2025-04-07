import { JsonValue } from "@prisma/client/runtime/library";

export type correctQuiz = {
    attemptId : string,
    records : Map<number,string>
}

export type Question = {
    question : string,
    options : string[],
    correct_answer : string
}

export type MapData = {
    data: {
      token: string;
      meta: any | null;
    };
    expiry: number | null;
  };
  
  export type UserMapData = {
    id: string;
    name?: string;
    email: string;
    refreshToken: string | null;
    expiry: number;
  };
  
  export type signData = {
    id: string;
    email: string;
    exp: number;
  };

  export type statsData = {
    quizes : number,
    attempted : number
  }

  export type AttemptData = {
    userId : string,
    attemptId : string,
    map : JsonValue,
    score? : number,
    id : string
  }