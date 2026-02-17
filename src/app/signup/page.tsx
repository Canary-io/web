export default function SignupPage() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col bg-white p-8 rounded-2xl shadow-md w-80">
          <h2 className="text-center text-xl mb-4 font-semibold">Sign Up</h2>
  
          {/* Github Sign-Up (same OAuth flow) */}
          <a
            href="http://localhost:4001/auth/github"
            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-4 text-center"
          >
            Sign up with Github
          </a>
  
          <p className="text-center text-gray-500 text-sm">
            Or log in if you already have an account
          </p>
        </div>
      </div>
    );
  }
  