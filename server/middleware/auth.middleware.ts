import { Context, Next } from "hono";

export const requireAuth = async (c: Context, next: Next) => {
  try {
    const authStatus = c.get("clerkAuth");

    if (!authStatus) {
      return c.json(
        { message: "Unauthorized: Missing auth token", success: false },
        401
      );
    }

    if (!authStatus.userId) {
      return c.json(
        {
          message: "Unauthorized: Invalid Clerk authentication",
          success: false,
        },
        401
      );
    }

    await next();
  } catch (error) {
    return c.json(
      {
        message: "Unauthorized",
        error: error instanceof Error ? error.message : String(error),
        success: false,
      },
      401
    );
  }
};
