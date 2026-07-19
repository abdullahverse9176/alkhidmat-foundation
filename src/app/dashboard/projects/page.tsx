import React from "react";
import { getProjectsAction, getServicesAction } from "@/app/actions/services";
import ProjectsManager from "@/components/ProjectsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Projects - Admin Portal",
  description: "View and edit primary Al-Khidmat localized water pumps and welfare projects.",
};

export default async function ManageProjectsPage() {
  const [projects, services] = await Promise.all([
    getProjectsAction(),
    getServicesAction(),
  ]);
  
  return (
    <div className="space-y-6">
      <ProjectsManager 
        initialProjects={projects} 
        services={services.map((s: any) => ({ title: s.title, slug: s.slug }))} 
      />
    </div>
  );
}
