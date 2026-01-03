import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full h-[64px] bg-black text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Image src="/logo.png" width={100} height={100} alt="tick_logo" />
        </div>

        <div className="flex gap-8 text-gray-400">
          <img src="/icons/facebook.svg" alt="facebook" />
          <img src="/icons/instagram.svg" alt="instagram" />
          <img src="/icons/twitter.svg" alt="x" />
        </div>
      </div>
    </footer>
  );
}
