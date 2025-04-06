import crypto from "crypto"

export const hashed = (str : string) => crypto.createHash("sha512").update(str).digest("hex");