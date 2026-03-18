import Image from "next/image";
import HomeNav from "@/components/homenav";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <HomeNav/>

      <main className="flex flex-col items-center justify-center text-center gap-6">

      <Image
          src="/orca-hi.png" 
          alt="Orca logo"
          width={360}
          height={360}
          className="rounded-xl"
          priority
        />

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight"> 
          Welcome
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
          A platform to deploy, run, and monitor your applications
        </p>

        <div className="flex gap-4 mt-4">
          <button className="px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </main>

      <footer className="text-sm text-gray-400 text-center">
      © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
