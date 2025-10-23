// app/login/page.jsx
export default function LoginPage() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          method="POST"
          action="/api/login"
          className="flex flex-col bg-white p-8 rounded-2xl shadow-md w-80"
        >
          <h2 className="text-center text-xl mb-4 font-semibold">Login</h2>
  
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="p-2 mb-3 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="p-2 mb-4 rounded-lg border border-gray-300"
          />
  
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
  