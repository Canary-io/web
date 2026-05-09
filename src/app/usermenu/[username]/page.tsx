import DeploymentsTable, { Deployment } from "@/components/deploymentstable";
import Sidebar from "@/components/sideBar";
import { fetchDeployments } from "@/utils/fetchDeployments";

interface UserMenuProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserMenu({ params }: UserMenuProps) {
  const { username } = await params;
  let deployments: Deployment[] = [];

  try {
    deployments = await fetchDeployments();
  } catch (error) {
    console.error("Failed to load deployments", error);
  }

  const formattedUsername = decodeURIComponent(username)
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-5 text-white shadow-lg">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {formattedUsername}!
          </h1>
          <p className="mt-2 text-sm text-blue-100">
            Here&apos;s a quick view of your current deployments.
          </p>
        </div>

        <DeploymentsTable deployments={deployments} />
      </div>
    </div>
  );
}
