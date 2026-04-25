"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const pathSegments = pathname.split("/").filter(Boolean);
  const username = pathSegments[1] ?? "";
  const homeHref = username ? `/usermenu/${username}` : "/login";
  const createDeploymentHref = username
    ? `/usermenu/${username}/deployments/new`
    : "/login";
  const isHomeActive =
    pathSegments[0] === "usermenu" && pathSegments.length === 2;
  const isCreateDeploymentActive = pathname.endsWith("/deployments/new");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen w-16 flex-col justify-between bg-gray-900 p-4 text-white">
        <div>
          <div className="mb-6 flex w-full justify-center">
            <Image
              src="/orca.png"
              alt="Orca logo"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>
          <Link
            href={homeHref}
            className={`flex w-full justify-center rounded p-2 transition ${
              isHomeActive ? "bg-gray-700 ring-1 ring-gray-500" : "hover:bg-gray-800"
            }`}
          >
            <Image
              src="/home.svg"
              alt="Home"
              width={30}
              height={30}
              className="invert"
            />
          </Link>
          <Link
            href={createDeploymentHref}
            className={`mt-2 flex w-full justify-center rounded p-2 transition ${
              isCreateDeploymentActive
                ? "bg-gray-700 ring-1 ring-gray-500"
                : "hover:bg-gray-800"
            }`}
          >
            <Image
              src="/add.svg"
              alt="Add"
              width={30}
              height={30}
              className="invert"
            />
          </Link>
        </div>
        <button
          className="flex w-full justify-center rounded p-2 transition hover:bg-gray-800"
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <Image
            src="/logout.svg"
            alt="Log out"
            width={30}
            height={30}
            className="invert"
          />
        </button>
      </div>
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-900 shadow-2xl">
            <h2 className="text-xl font-bold">Log out?</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to log out of your Orca dashboard?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                onClick={() => router.push("/login")}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
