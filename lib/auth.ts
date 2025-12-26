import type { NextApiRequest } from "next";
import { parse } from "cookie";

export function isAuthenticated(req: NextApiRequest): boolean {
  const cookies = parse(req.headers.cookie || "");
  return cookies.admin_auth === "authenticated";
}

export function requireAuth(req: NextApiRequest): boolean {
  if (!isAuthenticated(req)) {
    return false;
  }
  return true;
}
