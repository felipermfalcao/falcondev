import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = false;

type Props = {
  params: {
    slug: string;
  };
};

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? Redis.fromEnv()
  : null;

export async function generateStaticParams(): Promise<Props["params"][]> {
  const allProjects = await getAllProjects();
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  let views = 0;
  if (redis) {
    try {
      views = (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;
    } catch (error) {
      console.log("Redis error, using fallback views");
      views = 0;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      {/* Conteúdo MDX - COMENTADO (parte que antes era branca) */}
      {/* <div className="container mx-auto px-6 lg:px-8 pb-24">
        <article className="mx-auto prose prose-invert prose-zinc prose-quoteless max-w-4xl">
          <Mdx code={project.body.code} />
        </article>
      </div> */}
    </div>
  );
}
