import Link from "next/link";

export default function HomeNav() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-indigo-600">Canary</div>

      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li><a href="#home" className="hover:text-indigo-600">About</a></li>
        <li><a href="#features" className="hover:text-indigo-600">Contact</a></li>
        <li>
        <Link 
            href="/login" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        </li>
      </ul>

      <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100">
        {/* Hamburger icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
      </button>
    </nav>
  );
}

  