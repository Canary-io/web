import Image from "next/image";
import CreateDeployment from "./createDeployment";

export default function UserNavbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* Left side (you can put logo or leave empty) */}
      <div className="text-xl font-semibold text-gray-800">Canary</div>
      <CreateDeployment/>
      {/* Right side - user profile */}
      <div className="flex items-center space-x-3">
        <Image
          src="/images/profile.jpg" // replace with your image path or user.image
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full cursor-pointer hover:opacity-80 transition"
        />
      </div>
    </nav>
  );
}
