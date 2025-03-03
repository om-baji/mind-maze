import { metadata } from "@/utils/types";
import { atom } from "jotai";

export const userAtom = atom<metadata | null>(null)
