"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ImageUpload } from "@/app/components/ImageUpload";

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<Omit<Project, "slug">>({
    title: "",
    description: "",
    displayType: "normal",
    order: 1,
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);

    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        alert("Projeto criado com sucesso!");
        router.push("/admin");
      } else {
        alert("Erro ao criar projeto");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Erro ao criar projeto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-white">
              Novo Projeto
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Nome do projeto"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Descrição *
            </label>
            <textarea
              required
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Descrição do projeto"
            />
          </div>

          {/* Display Type */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Tipo de Destaque *
            </label>
            <select
              required
              value={project.displayType}
              onChange={(e) => setProject({ ...project, displayType: e.target.value as any })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="featured">🌟 Featured (Destaque Grande)</option>
              <option value="top2">⭐ Top 2 (Destaque Médio)</option>
              <option value="top3">⭐ Top 3 (Destaque Médio)</option>
              <option value="normal">📄 Normal (Grid Inferior)</option>
            </select>
          </div>

          {/* Ordem */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Ordem de Exibição *
            </label>
            <input
              type="number"
              required
              value={project.order}
              onChange={(e) => setProject({ ...project, order: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="1, 2, 3..."
            />
            <p className="text-xs text-zinc-500 mt-1">
              Números menores aparecem primeiro
            </p>
          </div>

          {/* Upload da Imagem */}
          <ImageUpload
            value={project.imgUrl}
            onChange={(url) => setProject({ ...project, imgUrl: url })}
            label="Imagem do Projeto"
          />

          {/* Descrição da Imagem */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Descrição da Imagem (Alt Text)
            </label>
            <input
              type="text"
              value={project.imgDescription || ""}
              onChange={(e) => setProject({ ...project, imgDescription: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Descrição da imagem para acessibilidade"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Website
            </label>
            <input
              type="url"
              value={project.website || ""}
              onChange={(e) => setProject({ ...project, website: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="https://exemplo.com"
            />
          </div>

          {/* Google Play */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Google Play
            </label>
            <input
              type="url"
              value={project.googlePlay || ""}
              onChange={(e) => setProject({ ...project, googlePlay: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="https://play.google.com/store/apps/details?id=..."
            />
          </div>

          {/* App Store */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              App Store
            </label>
            <input
              type="url"
              value={project.appStore || ""}
              onChange={(e) => setProject({ ...project, appStore: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="https://apps.apple.com/..."
            />
          </div>

          {/* Repositório GitHub */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Repositório GitHub
            </label>
            <input
              type="text"
              value={project.repository || ""}
              onChange={(e) => setProject({ ...project, repository: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="felipermfalcao/projeto-nome"
            />
          </div>

          {/* Data */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Data
            </label>
            <input
              type="date"
              value={project.date || ""}
              onChange={(e) => setProject({ ...project, date: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* Publicado */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={project.published}
              onChange={(e) => setProject({ ...project, published: e.target.checked })}
              className="w-5 h-5 rounded bg-white/5 border-white/10"
            />
            <label htmlFor="published" className="text-sm font-medium text-zinc-300">
              Publicado (visível no site)
            </label>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all text-white disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
              {saving ? "Criando..." : "Criar Projeto"}
            </button>
            <Link
              href="/admin"
              className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-zinc-300 hover:text-white"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
