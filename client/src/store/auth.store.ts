import { metadata } from "@/utils/types";
import { atomWithStorage } from "jotai/utils";

export const isSignnedInAtom = atomWithStorage<boolean | null>(
  "isSignedIn",
  null
);
export const authId = atomWithStorage<string | null>("authId", null);
export const userAtom = atomWithStorage<metadata | null>("userAtom", null);
