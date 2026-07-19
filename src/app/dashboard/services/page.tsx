import React from "react";
import { getServicesAction } from "@/app/actions/services";
import ServicesManager from "@/components/ServicesManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Services - Admin Portal",
  description: "View and edit primary Al-Khidmat service sectors.",
};

export default async function ManageServicesPage() {
  const services = await getServicesAction();
  
  return (
    <div className="space-y-6">
      <ServicesManager initialServices={services} />
    </div>
  );
}
