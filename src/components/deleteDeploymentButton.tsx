"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteDeploymentButtonProps {
  deploymentId: number | string;
  deploymentName: string;
}

export default function DeleteDeploymentButton({
  deploymentId,
  deploymentName,
}: DeleteDeploymentButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete deployment "${deploymentName}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/deployments/${deploymentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        throw new Error(payload?.error ?? "Failed to delete deployment.");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete deployment.";
      window.alert(message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
