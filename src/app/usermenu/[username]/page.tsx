import UserNav from "@/components/usernav";
import DeploymentsTable, { Deployment } from "@/components/deploymentstable";
import Sidebar from "@/components/sideBar";

const deployments: Deployment[] = [
    { id: 1, name: "Frontend App", status: "Running", url: "https://frontend.example.com" },
    { id: 2, name: "Backend API", status: "Pending", url: "https://api.example.com" },
  ];

export default function UserMenu() {
    return (
        <div className="flex">
      
        <Sidebar />
  
        <div className="flex-1 p-6">
          <DeploymentsTable deployments={deployments} />
        </div>
  
      </div>
    );
}

