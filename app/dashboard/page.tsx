import { checkAdminSession, getProjects } from '@/app/dashboard/actions';
import LoginForm from '@/components/LoginForm';
import DashboardClient from '@/app/dashboard/DashboardClient';
import { revalidatePath } from 'next/cache';

export default async function DashboardPage() {
  const isAuthorized = await checkAdminSession();

  if (!isAuthorized) {
    // Return login form. Once successful, we refresh the page to load authorized state.
    const handleLoginSuccess = async () => {
      'use server';
      revalidatePath('/dashboard');
    };

    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  // Fetch projects from Supabase/fallback
  const projects = await getProjects();

  return <DashboardClient initialProjects={projects} />;
}
