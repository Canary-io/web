"use client";

import Link from "next/link";
import { useState } from "react";
import RolloutActions from "@/components/rolloutActions";

interface DeploymentUrl {
  label: string;
  href: string;
}

export interface Deployment {
  id: string | number;
  name: string;
  status: string;
  deploymentUrls: DeploymentUrl[];
  metricsUrl?: string;
}

interface DeploymentsTableProps {
  deployments: Deployment[];
}

function getStatusClasses(status: string) {
  const normalizedStatus = status.trim().toLowerCase();

  if (normalizedStatus === "running" || normalizedStatus === "healthy") {
    return "border border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (normalizedStatus === "pending" || normalizedStatus === "deploying") {
    return "border border-amber-200 bg-amber-50 text-amber-800";
  }

  if (normalizedStatus === "failed" || normalizedStatus === "error") {
    return "border border-rose-200 bg-rose-50 text-rose-800";
  }

  return "border border-slate-200 bg-slate-100 text-slate-700";
}

function DeploymentUrlsModal({
  deploymentName,
  deploymentUrls,
  onClose,
}: {
  deploymentName: string;
  deploymentUrls: DeploymentUrl[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-slate-900">Deployment URLs</h3>
          <p className="mt-2 text-sm text-slate-600">
            View the available app URLs for {deploymentName}.
          </p>
        </div>

        <div className="space-y-4">
          {deploymentUrls.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              No app URLs are available for this deployment yet.
            </div>
          ) : (
            deploymentUrls.map((deploymentUrl) => (
              <div
                key={`${deploymentName}-${deploymentUrl.label}-${deploymentUrl.href}`}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {deploymentUrl.label}
                </p>
                <Link
                  href={deploymentUrl.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block break-all text-sm font-medium leading-6 text-blue-600 underline decoration-blue-300 underline-offset-2 transition hover:text-blue-700 hover:decoration-blue-700"
                >
                  {deploymentUrl.href}
                </Link>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DeploymentsTable({ deployments }: DeploymentsTableProps) {
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold">Name</th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold">Status</th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold">Deployment</th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold">Metrics</th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deployments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No deployments yet.
                </td>
              </tr>
            ) : (
              deployments.map((deployment) => (
                <tr key={deployment.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{deployment.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses(deployment.status)}`}
                    >
                      {deployment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {deployment.deploymentUrls.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setSelectedDeployment(deployment)}
                        className="inline-flex rounded-lg border border-sky-800 bg-sky-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:border-sky-900 hover:bg-sky-800"
                      >
                        View app
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">No app URLs</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {deployment.metricsUrl ? (
                      <Link
                        href={deployment.metricsUrl}
                        target="_blank"
                        className="inline-flex rounded-lg border border-slate-800 bg-slate-700 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
                      >
                        View metrics
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400">No metrics</span>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top">
                    <RolloutActions
                      deploymentId={deployment.id}
                      deploymentName={deployment.name}
                      status={deployment.status}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedDeployment ? (
        <DeploymentUrlsModal
          deploymentName={selectedDeployment.name}
          deploymentUrls={selectedDeployment.deploymentUrls}
          onClose={() => setSelectedDeployment(null)}
        />
      ) : null}
    </>
  );
}
