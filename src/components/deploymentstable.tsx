import Link from "next/link";

// Define the type for a single deployment
export interface Deployment {
    id: string | number;
    name: string;
    status: string;
    url: string;
  }
  
  // Define the props type for the table component
  interface DeploymentsTableProps {
    deployments: Deployment[];
  }

export default function DeploymentsTable({ deployments }: DeploymentsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-3 text-gray-700 font-semibold">Name</th>
            <th className="text-left px-6 py-3 text-gray-700 font-semibold">Status</th>
            <th className="text-left px-6 py-3 text-gray-700 font-semibold">Deployment</th>
          </tr>
        </thead>
        <tbody>
          {deployments.map((deployment) => (
            <tr key={deployment.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{deployment.name}</td>
              <td className="px-6 py-4">{deployment.status}</td>
              <td className="px-6 py-4">
                <Link
                  href={deployment.url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Visit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
