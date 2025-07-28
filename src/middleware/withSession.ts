import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { type Request, type Response, type NextFunction } from "express";

export const withSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    (req as any).user = session.user;
    next();
  } catch (error) {
    console.error("Session middleware error:", error);
    return res.status(500).json({ error: "Session error" });
  }
};
