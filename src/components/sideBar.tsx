import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="h-screen w-16 bg-gray-900 text-white flex flex-col justify-between p-4">
      <div>
        <div className="mb-6 flex w-full justify-center">
          <Image
            src="/orca.png"
            alt="Orca logo"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        </div>
        <button className="flex w-full justify-center p-2 rounded hover:bg-gray-800">
          <Image
            src="/home.svg"
            alt="Home"
            width={20}
            height={20}
            className="invert"
          />
        </button>
        <button className="mt-2 flex w-full justify-center p-2 rounded hover:bg-gray-800">
          <Image
            src="/add.svg"
            alt="Add"
            width={20}
            height={20}
            className="invert"
          />
        </button>
      </div>
      <button className="flex w-full justify-center p-2 rounded hover:bg-gray-800">
        <Image
          src="/settings.svg"
          alt="Settings"
          width={20}
          height={20}
          className="invert"
        />
      </button>
    </div>
  );
}
