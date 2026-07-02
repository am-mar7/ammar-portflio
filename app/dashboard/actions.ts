/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';
import { supabase, supabaseAdmin } from '@/lib/supabase/client';
import { Project } from '@/types/project';

// Helper to get expected session token based on env credentials
function getExpectedToken() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin';
  return crypto.createHash('sha256').update(`${username}:${password}`).digest('hex');
}

// Server-side helper to verify if the admin session cookie matches the expected token
export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('portfolio_admin_session')?.value;
  if (!sessionCookie) return false;
  return sessionCookie === getExpectedToken();
}

// Action to authenticate admin and set a secure session cookie
export async function loginAdmin(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';

  if (username === expectedUsername && password === expectedPassword) {
    const token = getExpectedToken();
    const cookieStore = await cookies();
    cookieStore.set('portfolio_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials' };
}

// Action to log out admin
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('portfolio_admin_session');
  revalidatePath('/dashboard');
  return { success: true };
}

// Helper to map DB columns (snake_case) to Frontend properties (camelCase)
function mapDbProjectToFrontend(dbProject: any): Project & { status: string; is_team: boolean; role?: string } {
  return {
    id: dbProject.id,
    slug: dbProject.slug,
    title: dbProject.title,
    description: dbProject.description,
    longDescription: dbProject.long_description || '',
    technologies: dbProject.technologies || [],
    screenshots: dbProject.screenshots || (dbProject.image_url ? [dbProject.image_url] : []),
    githubUrl: dbProject.repo_url || '',
    liveUrl: dbProject.live_url || '',
    architectureNotes: dbProject.architecture_notes || '',
    challenges: dbProject.challenges || '',
    featured: dbProject.featured || false,
    status: dbProject.status || 'finished',
    is_team: dbProject.is_team || false,
    role: dbProject.role || undefined,
  };
}

// Fetch projects from Supabase, fallback to static list if not configured or query fails
export async function getProjects(): Promise<(Project & { status: string; is_team: boolean; role?: string })[]> {
  if (!supabase) {
    console.warn('Supabase not configured.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map(mapDbProjectToFrontend);
  } catch (err) {
    console.error('Supabase connection failed:', err);
    return [];
  }
}

// Create a new project in Supabase (Admin only)
export async function createProject(projectData: Omit<Project, 'id' | 'slug'> & { slug?: string; status?: string; is_team?: boolean; role?: string }) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) throw new Error('Unauthorized');

  if (!supabaseAdmin) throw new Error('Supabase admin client not initialized');

  const slug = projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const dbData = {
    title: projectData.title,
    slug,
    description: projectData.description,
    long_description: projectData.longDescription || '',
    technologies: projectData.technologies || [],
    screenshots: projectData.screenshots || [],
    image_url: projectData.screenshots?.[0] || '',
    repo_url: projectData.githubUrl || '',
    live_url: projectData.liveUrl || '',
    architecture_notes: projectData.architectureNotes || '',
    challenges: projectData.challenges || '',
    featured: projectData.featured || false,
    status: projectData.status || 'finished',
    is_team: projectData.is_team || false,
    role: projectData.role || null,
  };

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert([dbData])
    .select()
    .single();

  if (error) {
    console.error('Create project error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/dashboard');
  return mapDbProjectToFrontend(data);
}

// Update an existing project in Supabase (Admin only)
export async function updateProject(id: string, projectData: Partial<Project> & { status?: string; is_team?: boolean; role?: string }) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) throw new Error('Unauthorized');

  if (!supabaseAdmin) throw new Error('Supabase admin client not initialized');

  const dbData: any = {};
  if (projectData.title !== undefined) dbData.title = projectData.title;
  if (projectData.slug !== undefined) dbData.slug = projectData.slug;
  if (projectData.description !== undefined) dbData.description = projectData.description;
  if (projectData.longDescription !== undefined) dbData.long_description = projectData.longDescription;
  if (projectData.technologies !== undefined) dbData.technologies = projectData.technologies;
  if (projectData.screenshots !== undefined) {
    dbData.screenshots = projectData.screenshots;
    dbData.image_url = projectData.screenshots?.[0] || '';
  }
  if (projectData.githubUrl !== undefined) dbData.repo_url = projectData.githubUrl;
  if (projectData.liveUrl !== undefined) dbData.live_url = projectData.liveUrl;
  if (projectData.architectureNotes !== undefined) dbData.architecture_notes = projectData.architectureNotes;
  if (projectData.challenges !== undefined) dbData.challenges = projectData.challenges;
  if (projectData.featured !== undefined) dbData.featured = projectData.featured;
  if (projectData.status !== undefined) dbData.status = projectData.status;
  if (projectData.is_team !== undefined) dbData.is_team = projectData.is_team;
  if (projectData.role !== undefined) dbData.role = projectData.role || null;

  const { data, error } = await supabaseAdmin
    .from('projects')
    .update(dbData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Update project error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/dashboard');
  return mapDbProjectToFrontend(data);
}

// Delete a project from Supabase (Admin only)
export async function deleteProject(id: string) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) throw new Error('Unauthorized');

  if (!supabaseAdmin) throw new Error('Supabase admin client not initialized');

  const { error } = await supabaseAdmin
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete project error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/dashboard');
  return { success: true };
}
