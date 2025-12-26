import type { NextApiRequest, NextApiResponse } from "next";
import { getAllProjects, saveProject, createSlug, type Project } from "@/lib/projects";
import { requireAuth } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar autenticação
  if (!requireAuth(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Listar todos os projetos
    try {
      const projects = await getAllProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }
  }

  if (req.method === "POST") {
    // Criar novo projeto
    try {
      const projectData = req.body as Omit<Project, "slug">;

      // Criar slug a partir do título
      const slug = createSlug(projectData.title);

      const project: Project = {
        ...projectData,
        slug,
      };

      await saveProject(project);

      return res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ error: "Failed to create project" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
