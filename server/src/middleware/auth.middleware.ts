import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { getPrismaClient } from "../db/prisma";
import { getCookie } from "hono/cookie";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const prisma = getPrismaClient(c.env.DATABASE_URL);
    const token = getCookie(c, "access");
    if (!token)
      return c.json(
        { message: "No authorization cookie", success: false },
        401
      );

    const revoked = await prisma.blacklist.findFirst({
      where: { token },
    });

    if (revoked) throw new Error("Token is revoked!");

    if (!c.env.ACCESS_SECRET)
      return c.json({ message: "Missing secret key", success: false }, 500);

    const decoded = await verify(token, c.env.ACCESS_SECRET);
    if (!decoded)
      return c.json(
        { message: "Invalid or malformed JWT!", success: false },
        403
      );

    c.set("jwtPayload", decoded);
    await next();
  } catch (error) {
    return c.json(
      {
        message: error instanceof Error ? error.message : "Unauthorized",
        success: false,
      },
      403
    );
  }
};
