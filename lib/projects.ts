import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type Project = {
  slug: string;
  title: string;
  description: string;
  displayType: "featured" | "top2" | "top3" | "normal";
  order: number;
  imgUrl?: string;
  imgDescription?: string;
  website?: string;
  googlePlay?: string;
  appStore?: string;
  url?: string; // Mantido por compatibilidade
  repository?: string;
  date?: string;
  published: boolean;
  body?: string;
};

/**
 * Busca todos os projetos
 */
export async function getAllProjects(): Promise<Project[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const projects = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(".mdx", "");
      const project = await getProjectBySlug(slug);
      return project;
    })
  );

  return projects.filter((p): p is Project => p !== null);
}

/**
 * Busca um projeto por slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      displayType: data.displayType || "normal",
      order: data.order || 999,
      imgUrl: data.imgUrl,
      imgDescription: data.imgDescription,
      website: data.website,
      googlePlay: data.googlePlay,
      appStore: data.appStore,
      url: data.url, // Mantido por compatibilidade
      repository: data.repository,
      date: data.date,
      published: data.published ?? false,
      body: content,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

/**
 * Salva ou atualiza um projeto
 */
export async function saveProject(project: Project): Promise<void> {
  const { slug, body, ...frontmatter } = project;

  const fileContent = matter.stringify(body || "", frontmatter);
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);

  await fs.writeFile(filePath, fileContent, "utf8");
}

/**
 * Deleta um projeto
 */
export async function deleteProject(slug: string): Promise<void> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  await fs.unlink(filePath);
}

/**
 * Cria um slug a partir do título
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
