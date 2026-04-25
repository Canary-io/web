import NewDeploymentForm from "@/components/newDeploymentForm";
import Sidebar from "@/components/sideBar";

interface NewDeploymentPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function NewDeploymentPage({
  params,
}: NewDeploymentPageProps) {
  const { username } = await params;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-5 text-white shadow-lg">
            <h1 className="text-3xl font-bold tracking-tight">
              Create a new deployment
            </h1>
            <p className="mt-2 text-sm text-blue-100">
              Fill out the deployment details below for your next app release.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-blue-100">
            <NewDeploymentForm username={username} />
          </div>
        </div>
      </div>
    </div>
  );
}
