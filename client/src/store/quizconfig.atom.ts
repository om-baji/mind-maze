import { formValues } from "@/models/formSchema";
import { atom } from "jotai";

export const configAtom = atom<formValues | null>(null)