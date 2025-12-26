import type { NextApiRequest, NextApiResponse } from "next";
import { getProjectBySlug, saveProject, deleteProject, type Project } from "@/lib/projects";
import { requireAuth } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar autenticação
  if (!requireAuth(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { slug } = req.query;

  if (typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid slug" });
  }

  if (req.method === "GET") {
    // Buscar projeto por slug
    try {
      const project = await getProjectBySlug(slug);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      return res.status(200).json(project);
    } catch (error) {
      console.error(`Error fetching project ${slug}:`, error);
      return res.status(500).json({ error: "Failed to fetch project" });
    }
  }

  if (req.method === "PUT") {
    // Atualizar projeto
    try {
      const projectData = req.body as Project;

      // Manter o slug original
      projectData.slug = slug;

      await saveProject(projectData);

      return res.status(200).json(projectData);
    } catch (error) {
      console.error(`Error updating project ${slug}:`, error);
      return res.status(500).json({ error: "Failed to update project" });
    }
  }

  if (req.method === "DELETE") {
    // Deletar projeto
    try {
      await deleteProject(slug);
      return res.status(204).end();
    } catch (error) {
      console.error(`Error deleting project ${slug}:`, error);
      return res.status(500).json({ error: "Failed to delete project" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
