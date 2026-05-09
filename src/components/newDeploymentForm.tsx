"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface NewDeploymentFormProps {
  username: string;
}

export default function NewDeploymentForm({
  username,
}: NewDeploymentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [deploymentStrategy, setDeploymentStrategy] = useState("canary");
  const stepsPattern = /^\d+(,\d+)*,100$/;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      deploymentName: String(formData.get("deploymentName") ?? ""),
      repoUrl: String(formData.get("repoUrl") ?? ""),
      imageName: String(formData.get("imageName") ?? ""),
      tag: String(formData.get("tag") ?? ""),
      dockerfilePath: String(formData.get("dockerfilePath") ?? ""),
      deploymentStrategy: String(formData.get("deploymentStrategy") ?? ""),
      steps:
        formData.get("deploymentStrategy") === "canary"
          ? String(formData.get("steps") ?? "")
          : "",
    };

    if (
      payload.deploymentStrategy === "canary" &&
      !stepsPattern.test(payload.steps)
    ) {
      setError("Steps must be comma-separated numbers and end with 100.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/user/createDeployment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create deployment");
      }

      router.push(`/usermenu/${username}`);
      router.refresh();
    } catch (caughtError) {
      if (caughtError instanceof TypeError) {
        setError("The deployment API at http://localhost:4001 is not reachable right now.");
      } else if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError("We couldn't create the deployment. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="deploymentName"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Deployment name
        </label>
        <input
          id="deploymentName"
          name="deploymentName"
          type="text"
          placeholder="orca-test"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          htmlFor="repoUrl"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Repo URL
        </label>
        <input
          id="repoUrl"
          name="repoUrl"
          type="url"
          placeholder="https://github.com/Canary-io/Test-Docker-Build"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          htmlFor="imageName"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Image name
        </label>
        <input
          id="imageName"
          name="imageName"
          type="text"
          placeholder="orca-test"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          htmlFor="tag"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Version
        </label>
        <input
          id="tag"
          name="tag"
          type="text"
          placeholder="v2"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          htmlFor="dockerfilePath"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Dockerfile path
        </label>
        <input
          id="dockerfilePath"
          name="dockerfilePath"
          type="text"
          placeholder="Dockerfile"
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label
          htmlFor="deploymentStrategy"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Deployment strategy
        </label>
        <div className="relative">
          <select
            id="deploymentStrategy"
            name="deploymentStrategy"
            defaultValue="canary"
            onChange={(event) => setDeploymentStrategy(event.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="canary">Canary</option>
            <option value="bluegreen">Blue-Green</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      {deploymentStrategy === "canary" ? (
        <div>
          <label
            htmlFor="steps"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Steps
          </label>
          <input
            id="steps"
            name="steps"
            type="text"
            placeholder="25,50,75,100"
            pattern="^\d+(,\d+)*,100$"
            title="Use comma-separated numbers ending in 100, for example 25,50,75,100"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex justify-end gap-3 pt-2">
        <Link
          href={`/usermenu/${username}`}
          className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create deployment"}
        </button>
      </div>
    </form>
  );
}
