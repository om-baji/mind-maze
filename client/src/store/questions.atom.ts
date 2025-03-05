import { questionType } from "@/utils/types";
import { atom } from "jotai";

export const questionAtom = atom<questionType[]>([]);
