import Link from "next/link";
import React from "react";
import { getAllProjects } from "@/lib/projects";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? Redis.fromEnv()
  : null;

export const revalidate = false;
export default async function ProjectsPage() {
  const allProjects = await getAllProjects();
  let views: Record<string, number> = {};

  if (redis) {
    try {
      const viewsData = await redis.mget<number[]>(
        ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
      );
      views = viewsData.reduce((acc, v, i) => {
        acc[allProjects[i].slug] = v ?? 0;
        return acc;
      }, {} as Record<string, number>);
    } catch (error) {
      // Fallback em caso de erro
      console.log("Redis error, using fallback views");
      views = allProjects.reduce((acc, p) => {
        acc[p.slug] = 0;
        return acc;
      }, {} as Record<string, number>);
    }
  } else {
    // Sem Redis configurado
    views = allProjects.reduce((acc, p) => {
      acc[p.slug] = 0;
      return acc;
    }, {} as Record<string, number>);
  }

  // Ordenar projetos publicados por order e pegar os 3 primeiros como destaques
  const publishedProjects = allProjects
    .filter((p) => p.published)
    .sort((a, b) => a.order - b.order);

  const featured = publishedProjects[0]; // Primeiro projeto = featured (grande)
  const top2 = publishedProjects[1];     // Segundo projeto = top2 (médio)
  const top3 = publishedProjects[2];     // Terceiro projeto = top3 (médio)

  const sorted = publishedProjects.slice(3); // Do quarto em diante = grid normal

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projetos
          </h2>
          <p className="mt-4 text-zinc-400">
             Alguns dos meus principais projetos.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {featured && (
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <Link href={`/projetos/${featured.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8">
              <div className="flex items-center justify-between gap-2">
                {/* <div className="text-xs text-zinc-100">
                  {featured.date ? (
                    <time dateTime={new Date(featured.date).toISOString()}>
                      {Intl.DateTimeFormat(undefined, {
                        dateStyle: "medium",
                      }).format(new Date(featured.date))}
                    </time>
                  ) : (
                    <span>EM BREVE</span>
                  )}
                </div> */}
                <span className="flex items-center gap-1 text-xs text-zinc-500 ml-auto">
                  <Eye className="w-4 h-4" />{" "}
                  {Intl.NumberFormat("pt-BR", { notation: "compact" }).format(
                    views[featured.slug] ?? 0
                  )}
                </span>
              </div>

                
                <div className="flex flex-col md:flex-row items-center">
                  <div>
                    <h2
                      id="featured-post"
                      className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                    >
                      {featured.title}
                    </h2>
                    <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300 mb-4">
                      {featured.description}
                    </p>
                    <div className="absolute bottom-4 md:bottom-8">
                      <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                        Detalhes do projeto <span aria-hidden="true">→</span>
                      </p>
                    </div>
                  </div>

                  <img
                    src={featured.imgUrl}
                    alt={featured.imgDescription}
                    className="max-w-full h-auto object-cover mt-4 md:mt-5 md:ml-4"
                    style={{ maxWidth: '250px' }}
                  />
                </div>



              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].filter(Boolean).map((project) => (
              <Card key={project!.slug}>
                <Article project={project!} views={views[project!.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>
        )}
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
