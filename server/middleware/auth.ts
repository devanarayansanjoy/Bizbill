import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";

let supabase: ReturnType<typeof createClient> | null = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];

  if (!supabase) {
    console.error("VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in the environment to verify RS256 tokens.");
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    // Supabase has updated new projects to use RS256 algorithms by default.
    // The most robust way to verify these tokens in Node.js is to use supabase.auth.getUser()
    // rather than jsonwebtoken, as it automatically handles JWKS public key fetching.
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.error("Supabase getUser error:", error);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    
    // Attach the user ID to the request
    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal server error during authentication" });
  }
}
