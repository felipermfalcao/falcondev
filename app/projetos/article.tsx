import type { Project } from "@/lib/projects";
import Link from "next/link";
import { Eye, View } from "lucide-react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projetos/${project.slug}`}>
			<article className="p-4 md:p-6">
				<div className="flex justify-between gap-2 items-center">
					{/* <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>EM BREVE...</span>
						)}
					</span> */}
					<span className="flex items-center gap-1 text-xs text-zinc-500 ml-auto">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("pt-BR", { notation: "compact" }).format(views)}
					</span>
				</div>
				<div className="flex flex-col md:flex-row items-center">
					<div>
						<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
							{project.title}
						</h2>
						<p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
							{project.description}
						</p>
					</div>

					<img
                    src={project.imgUrl}
                    alt={project.imgDescription}
                    className="max-w-full h-auto object-cover mt-4 md:mt-5 md:ml-4"
                    style={{ maxWidth: '180px' }}
                  	/>
				</div>
			</article>
		</Link>
	);
};
