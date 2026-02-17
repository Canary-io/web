export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col bg-white p-8 rounded-2xl shadow-md w-80">
        <h2 className="text-center text-xl mb-4 font-semibold">Login</h2>

        {/* Github Sign-In */}
        <a
          href="http://localhost:4001/auth/github"
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition mb-4 text-center"
        >
          Sign in with Github
        </a>

        {/* Sign-Up Link */}
        <a
          href="/signup"
          className="text-blue-500 text-center text-sm mt-2 hover:underline"
        >
          Don't have an account? Sign up
        </a>
      </div>
    </div>
  );
}
