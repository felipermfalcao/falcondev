import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import { requireAuth } from "@/lib/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar autenticação
  if (!requireAuth(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public", "img");

  // Garantir que o diretório existe
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    filename: (name, ext, part) => {
      // Criar nome único baseado no timestamp
      const uniqueName = `${Date.now()}-${part.originalFilename || "image"}`;
      return uniqueName;
    },
  });

  try {
    const [fields, files] = await form.parse(req);

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Renomear arquivo para ter um nome limpo
    const originalName = file.originalFilename || "image";
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newFileName = `${baseName}-${Date.now()}${ext}`;
    const newPath = path.join(uploadDir, newFileName);

    await fs.rename(file.filepath, newPath);

    // Retornar URL relativa
    const url = `/img/${newFileName}`;

    return res.status(200).json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload file" });
  }
}
