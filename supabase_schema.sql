-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    screenshots TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    repo_url TEXT,
    live_url TEXT,
    architecture_notes TEXT,
    challenges TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'finished' CHECK (status IN ('finished', 'working on', 'on maintenance')),
    is_team BOOLEAN NOT NULL DEFAULT false,
    role TEXT
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Allow anyone (public) to view the projects list and detail pages
CREATE POLICY "Allow public read access" 
ON public.projects 
FOR SELECT 
TO public 
USING (true);

-- Allow all operations for service_role client (used by our Server Actions)
CREATE POLICY "Allow service_role full control" 
ON public.projects 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- 4. Seed initial projects (matching your static projects.ts data)
INSERT INTO public.projects (
    id, 
    slug, 
    title, 
    description, 
    long_description, 
    technologies, 
    screenshots, 
    image_url, 
    repo_url, 
    live_url, 
    architecture_notes, 
    challenges, 
    featured, 
    status, 
    is_team, 
    role
)
VALUES
(
  'd3b07384-d113-4318-a6d1-4cb7061d49e6',
  'activo-store',
  'Activo Store',
  'A full-featured e-commerce platform with cart, checkout, and product management.',
  'Activo Store is a production-ready e-commerce application built with Next.js and Tailwind CSS. It features a dynamic product catalog, cart state management, checkout flow, and an admin dashboard for inventory management. The project demonstrates end-to-end full-stack thinking with a frontend-first approach.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Supabase'],
  ARRAY['/screenshots/activo-store-1.webp', '/screenshots/activo-store-2.webp'],
  '/screenshots/activo-store-1.webp',
  'https://github.com/am-mar7/activo-store',
  'https://activo-store.vercel.app',
  'Uses a headless architecture: Next.js App Router for SSR, Zustand for client cart state, Supabase for product catalog and orders. Images served via next/image with Vercel CDN.',
  'Handling cart persistence across sessions without authentication required combining localStorage with a Supabase anonymous session pattern.',
  true,
  'finished',
  false,
  NULL
),
(
  'a4b08709-1e35-431e-bf27-0fae24fb142a',
  'amona-tourism',
  'Amōnā — African Tourism Platform',
  'A Next.js travel platform for discovering and booking African tourism experiences.',
  'Amōnā is an A2SV collaborative project — a full-stack Next.js platform targeting African tourism. The platform features destination discovery, user profiles, a trip planner, and a content-rich hero section. I contributed the profile settings page and hero section using shadcn/ui, Tailwind, and Zod validation.',
  ARRAY['Next.js 14', 'TypeScript', 'shadcn/ui', 'Tailwind CSS', 'Zod'],
  ARRAY['/screenshots/amona-1.webp', '/screenshots/amona-2.webp'],
  '/screenshots/amona-1.webp',
  'https://github.com/am-mar7/amona',
  NULL,
  'Monorepo structure with shared UI components. Profile and settings pages are server components with client islands for interactive forms.',
  'Coordinating Git workflows across a team of 8 developers, resolving merge conflicts on shared layout components without breaking CI.',
  true,
  'finished',
  true,
  'Frontend Developer'
),
(
  'f14f4e7c-a496-48c0-811c-1bbd4f3b6070',
  'cbct-mpr-viewer',
  'CBCT MPR Viewer',
  'A medical-grade DICOM viewer with multiplanar reconstruction using VTK.js and Cornerstone3D.',
  'Built during my internship at 3D Diagnotix, this viewer renders CBCT dental scans in axial, sagittal, and coronal planes simultaneously. It features crosshair navigation, measurement tools (length and angle), and a modular component architecture. This is the most technically complex project in my portfolio.',
  ARRAY['React', 'Vite', 'VTK.js', 'Cornerstone3D', 'TypeScript', 'DICOM'],
  ARRAY['/screenshots/cbct-1.webp', '/screenshots/cbct-2.webp'],
  '/screenshots/cbct-1.webp',
  NULL,
  NULL,
  'Each MPR plane is an isolated Cornerstone3D viewport. A shared synchronizer service keeps crosshair positions in sync across viewports via an event bus pattern.',
  'Camera orientation in 3D space required deep understanding of VTK.js view normals and view-up vectors. NTFS partition read-only issues on Linux required manual remounting for DICOM file access.',
  true,
  'finished',
  false,
  NULL
),
(
  'e23bb410-b98a-40a2-861f-e8b248a32f6b',
  'note-app',
  'Note App',
  'A multi-user notes application built with Java and JavaFX.',
  'Note App is a desktop application built with Java 17 and JavaFX, supporting multiple user accounts, rich text notes, and local persistence. It demonstrates object-oriented design, MVC architecture, and Java UI development — core skills from my university coursework.',
  ARRAY['Java', 'JavaFX', 'OOP', 'MVC'],
  ARRAY['/screenshots/note-app-1.webp'],
  '/screenshots/note-app-1.webp',
  'https://github.com/am-mar7/NoteApp',
  NULL,
  'Strict MVC separation: Model layer owns persistence via serialized Java objects, Controller routes events, View is pure JavaFX FXML.',
  'Designing a user session system without a database — solved via serialized user objects with password hashing.',
  false,
  'finished',
  false,
  NULL
),
(
  'c95861fa-873b-48cf-9610-c11fa05ef44c',
  'dicom-ingestion-service',
  'DICOM Ingestion Service',
  'A Spring Boot microservice for ingesting and storing DICOM files to AWS S3.',
  'A backend microservice built with Java Spring Boot, integrating AWS S3 for DICOM file storage, MySQL for metadata, and JWT for authentication. Part of the 3D Diagnotix medical imaging backend infrastructure. This project marks my transition into backend/API development.',
  ARRAY['Java', 'Spring Boot', 'AWS S3', 'MySQL', 'JWT', 'Docker'],
  ARRAY['/screenshots/dicom-service-1.webp'],
  '/screenshots/dicom-service-1.webp',
  NULL,
  NULL,
  'REST API with layered architecture: Controller → Service → Repository. DICOM files stream directly to S3 via presigned URLs; only metadata is persisted in MySQL.',
  'Converting the Windows startup script to Linux-compatible shell script for containerized deployment on Ubuntu servers.',
  false,
  'finished',
  false,
  NULL
)
ON CONFLICT (slug) DO NOTHING;
