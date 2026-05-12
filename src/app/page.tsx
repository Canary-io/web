import Image from "next/image";
import Link from "next/link";
import HomeNav from "@/components/homenav";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-blue-100 font-sans">
      <HomeNav/>

      <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl flex-col justify-center gap-10 px-8 py-12 sm:px-12">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-8 text-white shadow-xl sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
            Deployment Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to Orca
          </h1>
          <p className="mt-3 max-w-2xl text-base text-blue-100 sm:text-lg">
            A platform to deploy, monitor, and safely release your applications with canary and blue-green deployment workflows built into your dashboard.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white/80 p-8 shadow-lg ring-1 ring-blue-100 backdrop-blur">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ship faster, monitor clearly
            </h2>
            <p className="mt-4 max-w-xl text-lg text-gray-600">
              Manage deployments, track live status, and keep your services organized from one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-800">
                Get Started
              </button>
              <Link
                href="/deployments/info"
                className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-gray-700 transition hover:bg-blue-50"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/orca-hi.png"
              alt="Orca logo"
              width={360}
              height={360}
              className="rounded-3xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </main>

      <footer className="pb-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
