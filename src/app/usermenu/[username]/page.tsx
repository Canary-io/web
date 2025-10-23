import UserNav from "@/components/usernav";
import DeploymentsTable, { Deployment } from "@/components/deploymentstable";

const deployments: Deployment[] = [
    { id: 1, name: "Frontend App", status: "Running", url: "https://frontend.example.com" },
    { id: 2, name: "Backend API", status: "Pending", url: "https://api.example.com" },
  ];

export default function UserMenu() {
    return (
        <div>
            <UserNav/>
            <DeploymentsTable deployments={deployments} />
        </div>
    );
}

