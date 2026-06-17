import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  if (!JWT_SECRET) {
    console.error("SUPABASE_JWT_SECRET is not configured in .env");
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    // Supabase JWTs are signed with the project's JWT Secret
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach the user ID to the request
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
