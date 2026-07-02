'use client';

import { useState, useTransition } from 'react';
import { Project } from '@/types/project';
import { createProject, updateProject, deleteProject, logoutAdmin } from '@/app/dashboard/actions';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Globe,
  Code,
  Users,
  CheckCircle,
  Clock,
  Wrench,
  X,
  Upload,
  Loader2
} from 'lucide-react';

interface DashboardClientProps {
  initialProjects: (Project & { status: string; is_team: boolean; role?: string })[];
}

export default function DashboardClient({ initialProjects }: DashboardClientProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [isPending, startTransition] = useTransition();

  // Modal / Form States
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<(Project & { status: string; is_team: boolean; role?: string }) | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [status, setStatus] = useState('finished');
  const [isTeam, setIsTeam] = useState(false);
  const [role, setRole] = useState('');
  const [architectureNotes, setArchitectureNotes] = useState('');
  const [challenges, setChallenges] = useState('');
  const [featured, setFeatured] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setLongDescription('');
    setTechInput('');
    setScreenshots([]);
    setGithubUrl('');
    setLiveUrl('');
    setStatus('finished');
    setIsTeam(false);
    setRole('');
    setArchitectureNotes('');
    setChallenges('');
    setFeatured(false);
    setFormError(null);
    setIsOpen(true);
  };

  const openEditModal = (p: Project & { status: string; is_team: boolean; role?: string }) => {
    setEditingProject(p);
    setTitle(p.title);
    setDescription(p.description);
    setLongDescription(p.longDescription || '');
    setTechInput(p.technologies?.join(', ') || '');
    setScreenshots(p.screenshots || []);
    setGithubUrl(p.githubUrl || '');
    setLiveUrl(p.liveUrl || '');
    setStatus(p.status || 'finished');
    setIsTeam(p.is_team || false);
    setRole(p.role || '');
    setArchitectureNotes(p.architectureNotes || '');
    setChallenges(p.challenges || '');
    setFeatured(p.featured || false);
    setFormError(null);
    setIsOpen(true);
  };

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      await logoutAdmin();
      router.refresh();
      window.location.reload();
    }
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingImages(true);
    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        uploaded.push(data.url);
      }
      setScreenshots((prev) => [...prev, ...uploaded]);
    } catch (err: any) {
      setFormError(err.message || 'Image upload failed');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await deleteProject(id);
        setProjects(projects.filter((p) => p.id !== id));
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to delete project');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);

    const technologies = techInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '');

    const payload = {
      title,
      description,
      longDescription,
      technologies,
      screenshots,
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      status,
      is_team: isTeam,
      role: isTeam ? role : undefined,
      architectureNotes: architectureNotes || undefined,
      challenges: challenges || undefined,
      featured,
    };

    try {
      if (editingProject) {
        // Edit Mode
        const updated = await updateProject(editingProject.id, payload);
        setProjects(
          projects.map((p) => (p.id === editingProject.id ? { ...p, ...updated } : p))
        );
      } else {
        // Add Mode
        const created = await createProject(payload);
        setProjects([created, ...projects]);
      }
      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while saving the project.');
    } finally {
      setFormLoading(false);
    }
  };

  const getStatusIcon = (s: string) => {
    switch (s) {
      case 'finished':
        return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case 'working on':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'on maintenance':
        return <Wrench className="h-4 w-4 text-cyan-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100 selection:bg-sky-500 selection:text-white">     

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Project Inventory</h2>
          <p className="text-xs text-white/40 mt-1">Manage and sync project data on Supabase.</p>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/20 p-12 text-center">
            <p className="text-sm text-white/40">No projects found. Click "Add Project" to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-zinc-900/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
                      {p.title}
                    </h3>
                    {p.featured && (
                      <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[9px] font-semibold text-sky-400 border border-sky-500/20">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-3 text-xs text-white/60 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.technologies?.length > 4 && (
                      <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                        +{p.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="mt-5 border-t border-white/5 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      {getStatusIcon(p.status)}
                      <span className="capitalize">{p.status}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Users className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{p.is_team ? `Team (${p.role || 'Contributor'})` : 'Solo Project'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-3 text-white/40">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                        <Code className="h-4 w-4" />
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="rounded-xl border border-white/10 p-2 text-white/70 hover:text-white hover:bg-white/5 transition-all"
                      title="Edit Project"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="rounded-xl border border-rose-500/20 p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all"
                      title="Delete Project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Dialog / Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 p-6 md:p-8 shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Project'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-white/50 hover:text-white hover:bg-white/5 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-xs text-rose-300">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase">Project Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all"
                      placeholder="e.g. E-Commerce Platform"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase">Short Description</label>
                    <input
                      type="text"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all"
                      placeholder="Brief one-sentence summary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase">Long Description</label>
                    <textarea
                      value={longDescription}
                      onChange={(e) => setLongDescription(e.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all resize-none"
                      placeholder="Detailed markdown or description of features"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all"
                      placeholder="Next.js, Tailwind CSS, TypeScript"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase">Screenshots</label>

                    {/* Upload button */}
                    <label className={`flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-xs text-white/50 hover:border-sky-500/50 hover:text-white/70 transition-all ${
                      uploadingImages ? 'pointer-events-none opacity-50' : ''
                    }`}>
                      {uploadingImages
                        ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</>
                        : <><Upload className="h-4 w-4" /> Click to upload images</>}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleImageUpload(e.target.files)}
                      />
                    </label>

                    {/* Preview grid */}
                    {screenshots.length > 0 && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {screenshots.map((url, i) => (
                          <div key={i} className="group relative aspect-video overflow-hidden rounded-lg border border-white/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt={`screenshot-${i}`} className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setScreenshots(screenshots.filter((_, idx) => idx !== i))}
                              className="absolute right-1 top-1 hidden group-hover:flex items-center justify-center rounded-full bg-black/70 p-0.5 text-white hover:bg-rose-600 transition-all"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50 uppercase">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all"
                      >
                        <option value="finished">Finished</option>
                        <option value="working on">Working On</option>
                        <option value="on maintenance">On Maintenance</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50 uppercase">Featured</label>
                      <div className="flex h-[45px] items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                          className="h-4 w-4 rounded border-white/10 bg-white/5 text-sky-500 focus:ring-sky-500"
                        />
                        <label htmlFor="featured" className="ml-2.5 text-xs text-white/70 cursor-pointer">
                          Show on home page
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50 uppercase">Project Type</label>
                      <div className="flex h-[45px] items-center">
                        <input
                          type="checkbox"
                          id="isTeam"
                          checked={isTeam}
                          onChange={(e) => setIsTeam(e.target.checked)}
                          className="h-4 w-4 rounded border-white/10 bg-white/5 text-sky-500 focus:ring-sky-500"
                        />
                        <label htmlFor="isTeam" className="ml-2.5 text-xs text-white/70 cursor-pointer">
                          Team Project
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50 uppercase">Role (if team)</label>
                      <input
                        type="text"
                        disabled={!isTeam}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 disabled:opacity-30 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all"
                        placeholder="Fullstack Developer"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase">GitHub Repo URL</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all"
                      placeholder="https://github.com/username/project"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase">Live Demo URL</label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all"
                      placeholder="https://project.vercel.app"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase">Architecture Notes</label>
                    <textarea
                      value={architectureNotes}
                      onChange={(e) => setArchitectureNotes(e.target.value)}
                      rows={2}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all resize-none"
                      placeholder="Uses Next.js App Router, Zustand, etc."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase">Challenges Faced</label>
                    <textarea
                      value={challenges}
                      onChange={(e) => setChallenges(e.target.value)}
                      rows={2}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500 transition-all resize-none"
                      placeholder="Handling race conditions on concurrent fetches..."
                    />
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={formLoading}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="rounded-xl bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition-all disabled:opacity-50"
                >
                  {formLoading ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
