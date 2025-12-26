"use client";
import { ArrowLeft, Eye, Github, Twitter, ExternalLink, Code2 } from "lucide-react";
import { IoLogoWhatsapp, IoMailOutline, IoLogoGooglePlaystore, IoLogoApple  } from "react-icons/io5";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Particles from "@/app/components/particles";

type Props = {
	project: {
		website?: string;
		googlePlay?: string;
		appStore?: string;
		url?: string; // Mantido por compatibilidade
		title: string;
		description: string;
		repository?: string;
		imgUrl?: string;
		imgDescription?: string;
	};

	views: number;
};
export const Header: React.FC<Props> = ({ project, views }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.website) {
		links.push({
			label: "Website",
			href: project.website,
		});
	}
	if (project.googlePlay) {
		links.push({
			label: "Google Play",
			href: project.googlePlay,
		});
	}
	if (project.appStore) {
		links.push({
			label: "App Store",
			href: project.appStore,
		});
	}
	// Fallback para compatibilidade com projetos antigos
	if (!project.website && !project.googlePlay && !project.appStore && project.url) {
		links.push({
			label: "Website",
			href: project.url,
		});
	}
	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			{/* Partículas animadas de fundo */}
			<Particles
				className="absolute inset-0 -z-10"
				quantity={80}
				staticity={50}
				ease={50}
			/>

			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-white/10  border-zinc-200 lg:border-transparent"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<span
							title="View counter for this page"
							className={`duration-200 hover:font-medium flex items-center gap-1 ${
								isIntersecting
									? " text-zinc-400 hover:text-zinc-100"
									: "text-zinc-600 hover:text-zinc-900"
							} `}
						>
							<Eye className="w-5 h-5" />{" "}
							{Intl.NumberFormat("pt-BR", { notation: "compact" }).format(
								views,
							)}
						</span>
						<Link target="_blank" href="https://bit.ly/devfalcon">
							<IoLogoWhatsapp
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
						<Link target="_blank" href="https://github.com/felipermfalcao">
							<Github
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
					</div>

					<Link
						href="/projetos"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
						} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					{/* Layout Desktop: Grid 2 colunas */}
					<div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">

						{/* Coluna Conteúdo - Desktop direita */}
						<div className={`lg:order-2 ${!project.imgUrl ? 'lg:col-span-2 text-center' : ''}`}>
							{/* Contador de Views */}
							<div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 animate-fade-in">
								<Eye className="w-4 h-4 text-zinc-400" />
								<span className="text-sm font-medium text-zinc-300">
									{Intl.NumberFormat("pt-BR", { notation: "compact" }).format(views)} visualizações
								</span>
							</div>

							{/* Título */}
							<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display animate-fade-in" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
								{project.title}
							</h1>

							{/* Descrição */}
							<p className="mt-6 text-lg leading-8 text-zinc-300 animate-fade-in" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
								{project.description}
							</p>

							{/* Imagem Mobile - Aparece aqui após descrição */}
							{project.imgUrl && (
								<div className="lg:hidden mt-8 mb-8 animate-fade-in" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
									<div className="relative group">
										<img
											src={project.imgUrl}
											alt={project.imgDescription || project.title}
											className="rounded-lg shadow-2xl w-full h-auto object-cover transform group-hover:scale-[1.02] transition duration-500"
										/>
									</div>
								</div>
							)}

							{/* Botões Glassmorphism */}
							{links.length > 0 && (
								<div className="mt-10 flex flex-col gap-4 animate-fade-in" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
									{links.map((link) => {
										// Detectar tipo de link
										const isGithub = link.label === "GitHub";
										const isGooglePlay = link.label === "Google Play" || link.href.includes("play.google.com");
										const isAppStore = link.label === "App Store" || link.href.includes("apps.apple.com");

										// Selecionar ícone apropriado
										let Icon = ExternalLink;
										let subtitle = "Projeto ao vivo";

										if (isGithub) {
											Icon = Code2;
											subtitle = "Repositório";
										} else if (isGooglePlay) {
											Icon = IoLogoGooglePlaystore;
											subtitle = "Disponível na";
										} else if (isAppStore) {
											Icon = IoLogoApple;
											subtitle = "Disponível na";
										}

										return (
											<Link
												target="_blank"
												key={link.label}
												href={link.href}
												className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 p-4 transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl hover:border-white/40"
											>
												{/* Shimmer effect no hover */}
												<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

												<div className="relative flex items-center justify-between">
													<div className="flex items-center gap-3">
														{/* Ícone com animação */}
														<div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
															<Icon className="w-5 h-5 text-zinc-300 group-hover:text-white group-hover:scale-110 transition-all" />
														</div>

														{/* Texto */}
														<div>
															<div className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
																{subtitle}
															</div>
															<div className="text-lg font-semibold text-white mt-1">
																{link.label}
															</div>
														</div>
													</div>

													{/* Seta com animação */}
													<div className="text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
														<span className="text-2xl">→</span>
													</div>
												</div>
											</Link>
										);
									})}
								</div>
							)}
						</div>

						{/* Imagem Desktop - Esquerda, escondida no mobile */}
						{project.imgUrl && (
							<div className="hidden lg:block lg:order-1 animate-fade-in" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
								<div className="relative group sticky top-24">
									<img
										src={project.imgUrl}
										alt={project.imgDescription || project.title}
										className="rounded-lg shadow-2xl w-full h-auto object-cover transform group-hover:scale-[1.02] transition duration-500"
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
