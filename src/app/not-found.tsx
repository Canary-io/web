export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <a 
          href="/" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go Home
        </a>
      </div>
    );
  }
  