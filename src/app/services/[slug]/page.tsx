import { notFound } from "next/navigation";
import { servicesData } from "@/data/mockData";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Heart,
  Users,
  Target,
} from "lucide-react";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = servicesData.find((item) => item.slug === slug);

  if (!service) notFound();

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-500 py-24 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            Welfare Service
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            {service.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-white/90">
            {service.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/donate"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:bg-gray-100"
            >
              Donate Now
            </Link>

            <Link
              href="/volunteer"
              className="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-emerald-700"
            >
              Become Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24">
        <div className="container mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">

          <div>
            <h2 className="mb-6 text-3xl font-bold">
              About This Service
            </h2>

            <p className="mb-5 text-gray-600 leading-8">
              {service.description}
            </p>

            <p className="text-gray-600 leading-8">
              Our mission is to improve lives through sustainable welfare
              initiatives. Every donation and volunteer effort directly impacts
              families in need and helps build stronger communities.
            </p>
          </div>

          <div className="rounded-3xl bg-gray-100 p-10">
            <h3 className="mb-6 text-2xl font-semibold">
              What We Provide
            </h3>

            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Professional Community Support
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Emergency Assistance
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Sustainable Welfare Projects
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Volunteer Engagement
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">

          <div className="rounded-2xl bg-white p-8 shadow">
            <Users className="mb-4 text-green-600" size={40} />
            <h3 className="text-4xl font-bold">25K+</h3>
            <p className="text-gray-500 mt-2">
              Beneficiaries
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <Heart className="mb-4 text-red-500" size={40} />
            <h3 className="text-4xl font-bold">5K+</h3>
            <p className="text-gray-500 mt-2">
              Volunteers
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <Target className="mb-4 text-blue-600" size={40} />
            <h3 className="text-4xl font-bold">100+</h3>
            <p className="text-gray-500 mt-2">
              Projects
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <CheckCircle className="mb-4 text-emerald-600" size={40} />
            <h3 className="text-4xl font-bold">40+</h3>
            <p className="text-gray-500 mt-2">
              Cities Covered
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl rounded-3xl bg-emerald-700 px-10 py-16 text-center text-white">

          <h2 className="text-4xl font-bold">
            Help Us Make a Difference
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/90">
            Your support enables us to continue delivering life-changing
            services to vulnerable communities across the country.
          </p>

          <Link
            href="/donate"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-emerald-700 transition hover:bg-gray-100"
          >
            Donate Now
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>
    </main>
  );
}