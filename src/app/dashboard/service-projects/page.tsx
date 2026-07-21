import React from "react";
import { getProjectsAction, getServicesAction } from "@/app/actions/services";
import ServiceProjectsManager from "@/components/ServiceProjectsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Service Projects - Admin Portal",
  description: "View and edit specifications and custom details for localized welfare projects.",
};

export default async function ServiceProjectsPage() {
  const [projects, services] = await Promise.all([
    getProjectsAction(),
    getServicesAction(),
  ]);
  
  return (
    <div className="space-y-6">
      <ServiceProjectsManager 
        initialProjects={projects} 
        services={services.map((s: any) => ({ title: s.title, slug: s.slug }))} 
      />
    </div>
  );
}
