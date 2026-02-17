"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function CreateDeployment() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modal = open ? (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Create New Deployment
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Deployment Name"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="url"
            placeholder="Repository URL"
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Deploy
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 font-semibold"
      >
        Create Deployment
      </button>

      {mounted && createPortal(modal, document.body)}
    </>
  );
}

