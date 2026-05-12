"use client";

import { useState } from "react";
import DeleteDeploymentButton from "@/components/deleteDeploymentButton";
import StartRolloutButton from "@/components/startRolloutButton";

interface RolloutActionsProps {
  deploymentId: number | string;
  deploymentName: string;
  status: string;
}

function hasActiveRollout(status: string) {
  const normalizedStatus = status.trim().toLowerCase();

  return (
    normalizedStatus === "deploying" ||
    normalizedStatus === "running" ||
    normalizedStatus === "healthy"
  );
}

export default function RolloutActions({
  deploymentId,
  deploymentName,
  status,
}: RolloutActionsProps) {
  const [rolloutStarted, setRolloutStarted] = useState(hasActiveRollout(status));
  const [isPromoting, setIsPromoting] = useState(false);
  const [promoteError, setPromoteError] = useState("");

  async function handlePromoteRollout() {
    if (!rolloutStarted || isPromoting) {
      return;
    }

    setIsPromoting(true);
    setPromoteError("");

    try {
      const response = await fetch("/api/user/promoteRollout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rolloutName: deploymentName.trim(),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        throw new Error(payload?.error ?? "Failed to promote rollout.");
      }
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setPromoteError(caughtError.message);
      } else {
        setPromoteError("We couldn't promote the rollout. Please try again.");
      }
    } finally {
      setIsPromoting(false);
    }
  }

  return (
    <div className="min-w-[220px]">
      <div className="flex flex-wrap gap-2">
        <StartRolloutButton
          deploymentName={deploymentName}
          onStartRollout={() => {
            setRolloutStarted(true);
            setPromoteError("");
          }}
        />
        <button
          type="button"
          onClick={handlePromoteRollout}
          disabled={!rolloutStarted || isPromoting}
          className="inline-flex rounded-lg border border-emerald-800 bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-500 disabled:bg-emerald-500 disabled:text-white disabled:opacity-100"
          title={
            rolloutStarted
              ? `Promote rollout for ${deploymentName}`
              : "Start a rollout before promoting it."
          }
        >
          {isPromoting ? "Promoting..." : "Promote rollout"}
        </button>
        <button
          type="button"
          className="inline-flex rounded-lg px-3 py-2 text-sm font-medium text-black transition hover:brightness-95"
          style={{ backgroundColor: "rgb(255, 255, 0)" }}
        >
          Rollback rollout
        </button>
        <DeleteDeploymentButton
          deploymentId={deploymentId}
          deploymentName={deploymentName}
        />
      </div>
      {promoteError ? (
        <p className="mt-2 text-sm text-red-600">{promoteError}</p>
      ) : null}
    </div>
  );
}
