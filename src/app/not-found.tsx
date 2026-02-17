//add return home functionality
export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
      </div>
    );
  }
  