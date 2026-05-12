import Link from "next/link";
import HomeNav from "@/components/homenav";

export default function DeploymentInfoPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <HomeNav />

      <main className="mx-auto max-w-5xl px-8 py-12 sm:px-12">
        <div className="rounded-3xl bg-gradient-to-r from-sky-700 to-cyan-600 px-8 py-10 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
            Deployment Strategies
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Canary and Blue-Green Deployments
          </h1>
          <p className="mt-4 max-w-3xl text-base text-cyan-50 sm:text-lg">
            These rollout patterns help teams ship safely, reduce downtime, and spot
            problems before they affect everyone.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
              Canary Deployment
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Release gradually</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              A canary deployment sends a small slice of live traffic to the new version
              first. If metrics, logs, and user behavior look healthy, you slowly
              increase traffic until the new version serves everyone.
            </p>
            <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Why teams use it</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                It lowers risk because issues show up early, while the impact is still
                limited to a small audience.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Tradeoffs</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Canary rollouts need strong observability and traffic controls so you
                can compare old and new versions with confidence.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Blue-Green Deployment
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Switch environments</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              A blue-green deployment keeps two full environments running: one live and
              one idle. You deploy the new version to the idle environment, test it,
              then switch production traffic over in one step.
            </p>
            <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Why teams use it</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                It makes rollback fast because the previous environment is still
                available if the new one has trouble.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">Tradeoffs</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Running two environments can cost more, and switching everything at once
                still needs careful validation.
              </p>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">When to use each</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Choose canary deployments when you want to validate a release with real
            traffic in small steps. Choose blue-green deployments when you want a clean
            environment switch and a straightforward rollback path.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded-xl bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
            >
              Back to home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
