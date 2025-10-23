import { Deployment } from "@/components/deploymentstable";

/**
 * Simulates fetching deployments from an API.
 * Returns a promise that resolves after 1 second.
 */
export async function fetchDeployments(): Promise<Deployment[]> {

  //This will be replaced eventually
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Dummy deployments data
  const deployments: Deployment[] = [
    { id: 1, name: "Frontend App", status: "Running", url: "https://frontend.example.com" },
    { id: 2, name: "Backend API", status: "Pending", url: "https://api.example.com" },
    { id: 3, name: "Database", status: "Failed", url: "https://db.example.com" },
  ];

  return deployments;
}
