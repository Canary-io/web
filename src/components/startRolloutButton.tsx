"use client";

import { FormEvent, useState } from "react";

interface StartRolloutButtonProps {
  deploymentName: string;
  onStartRollout?: (versionName: string) => void;
}

export default function StartRolloutButton({
  deploymentName,
  onStartRollout,
}: StartRolloutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [versionName, setVersionName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const isInactive = isSubmitting;

  function handleStartRollout() {
    if (isInactive) {
      return;
    }

    setError("");
    setVersionName("");
    setIsModalOpen(true);
  }

  async function handleSubmitVersion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!versionName.trim()) {
      setError("Enter a version name before starting the rollout.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/user/startRollout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deploymentName,
          tag: versionName.trim(),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        throw new Error(payload?.error ?? "Failed to start rollout.");
      }

      onStartRollout?.(versionName.trim());
      setIsModalOpen(false);
      setVersionName("");
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError("We couldn't start the rollout. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleStartRollout}
        aria-disabled={isInactive}
        className={`inline-flex appearance-none rounded-lg border px-3 py-2 text-sm font-medium text-white opacity-100 shadow-sm transition ${
          isInactive
            ? "cursor-not-allowed border-sky-800 bg-sky-600"
            : "cursor-pointer border-sky-800 bg-sky-600 hover:border-sky-900 hover:bg-sky-800"
        }`}
        style={{ backgroundColor: "#0284c7", color: "#ffffff", opacity: 1 }}
        title={`Start rollout for ${deploymentName}`}
      >
        Start rollout
      </button>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5">
              <h3 className="text-xl font-semibold text-slate-900">
                Start rollout
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Enter the version name for {deploymentName}.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmitVersion}>
              <div>
                <label
                  htmlFor={`version-name-${deploymentName}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Version name
                </label>
                <input
                  id={`version-name-${deploymentName}`}
                  name="versionName"
                  type="text"
                  value={versionName}
                  onChange={(event) => setVersionName(event.target.value)}
                  placeholder="v2.3.1"
                  autoFocus
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setVersionName("");
                    setError("");
                  }}
                  disabled={isSubmitting}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Starting..." : "Submit version"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
