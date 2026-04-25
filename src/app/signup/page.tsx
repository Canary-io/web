import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-blue-100">
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gray-900 p-2 shadow-md transition hover:bg-gray-800"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src="/orca.png"
              alt="Orca logo"
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </div>
      <div className="flex min-h-[calc(100vh-88px)] items-center justify-center px-6 pb-10">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-blue-100 sm:p-10">
          <div className="mb-6 flex justify-center">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src="/orca.png"
                alt="Orca logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign Up
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use GitHub to create your Orca account.
          </p>

          <a
            href="http://localhost:4001/auth/github"
            className="mt-8 flex w-full items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Sign up with GitHub
          </a>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
