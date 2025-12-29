import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

// Senha padrão: "admin123" (você pode mudar via .env)
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ||
  "$2a$10$X8qJ5YqKZ1vJ3LxXqZ5YqOZJ5YqKZ1vJ3LxXqZ5YqOZJ5YqKZ1vJ3"; // admin123

// Token secreto (você DEVE mudar isso em produção via .env)
const AUTH_SECRET = process.env.AUTH_SECRET || "change-this-secret-in-production";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  try {
    // Se não tem hash configurado, aceita qualquer senha em dev
    if (process.env.NODE_ENV === "development" && !process.env.ADMIN_PASSWORD_HASH) {
      console.log("⚠️  AVISO: Usando modo desenvolvimento sem senha configurada!");

      // Criar cookie de autenticação
      const cookie = serialize("admin_auth", "authenticated", {
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: "/",
      });

      res.setHeader("Set-Cookie", cookie);
      return res.status(200).json({ success: true });
    }

    // Validar senha com bcrypt
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Criar cookie de autenticação
    const cookie = serialize("admin_auth", "authenticated", {
      httpOnly: true,
      secure: (process.env.NODE_ENV as string) === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
