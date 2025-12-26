"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, LogOut, GripVertical } from "lucide-react";
import type { Project } from "@/lib/projects";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableProject({
  project,
  views,
  onDelete,
  getDisplayTypeLabel,
}: {
  project: Project;
  views: Record<string, number>;
  onDelete: (slug: string) => void;
  getDisplayTypeLabel: (type: string) => string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.slug });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all p-6"
    >
      <div className="flex items-start gap-4">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-zinc-500 hover:text-zinc-300 transition-colors mt-2"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        {/* Imagem */}
        {project.imgUrl && (
          <img
            src={project.imgUrl}
            alt={project.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
        )}

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-400 mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-white/10 text-zinc-300">
                  {getDisplayTypeLabel(project.displayType)}
                </span>
                <span className="px-2 py-1 rounded bg-white/10 text-zinc-300">
                  Ordem: {project.order}
                </span>
                {project.published ? (
                  <span className="px-2 py-1 rounded bg-green-500/20 text-green-300">
                    ✓ Publicado
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-300">
                    ○ Rascunho
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href={`/projetos/${project.slug}`}
                target="_blank"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all text-zinc-300 hover:text-white"
                title="Visualizar"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                href={`/admin/edit/${project.slug}`}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all text-zinc-300 hover:text-white"
                title="Editar"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onDelete(project.slug)}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all text-red-300 hover:text-red-200"
                title="Deletar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState<Record<string, number>>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      const data = await response.json();
      setProjects(data.sort((a: Project, b: Project) => a.order - b.order));
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = projects.findIndex((p) => p.slug === active.id);
    const newIndex = projects.findIndex((p) => p.slug === over.id);

    const newProjects = arrayMove(projects, oldIndex, newIndex);

    // Atualizar ordem local imediatamente
    const updatedProjects = newProjects.map((p, index) => ({
      ...p,
      order: index + 1,
    }));

    setProjects(updatedProjects);

    // Salvar no backend
    try {
      await Promise.all(
        updatedProjects.map((project) =>
          fetch(`/api/admin/projects/${project.slug}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
          })
        )
      );
    } catch (error) {
      console.error("Error updating project order:", error);
      alert("Erro ao atualizar ordem dos projetos");
      // Reverter em caso de erro
      fetchProjects();
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Tem certeza que deseja deletar este projeto?")) {
      return;
    }

    try {
      await fetch(`/api/admin/projects/${slug}`, {
        method: "DELETE",
      });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Erro ao deletar projeto");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getDisplayTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      featured: "🌟 Featured (Grande)",
      top2: "⭐ Top 2 (Médio)",
      top3: "⭐ Top 3 (Médio)",
      normal: "📄 Normal (Grid)",
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/projetos"
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-3xl font-bold text-white">
                Gerenciar Projetos
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/new"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all text-white"
              >
                <Plus className="w-5 h-5" />
                Novo Projeto
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all text-red-300 hover:text-red-200"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center text-zinc-400 py-12">
            Carregando projetos...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-zinc-400 py-12">
            Nenhum projeto encontrado. Crie um novo projeto!
          </div>
        ) : (
          <div>
            <div className="mb-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
              💡 Arraste e solte os projetos para reordenar. A ordem será salva automaticamente.
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={projects.map((p) => p.slug)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <SortableProject
                      key={project.slug}
                      project={project}
                      views={views}
                      onDelete={handleDelete}
                      getDisplayTypeLabel={getDisplayTypeLabel}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>
    </div>
  );
}
