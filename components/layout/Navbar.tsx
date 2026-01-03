import { cookies } from "next/headers";
import NavAuth from "./NavAuth";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  const isAuthenticated = !!token;

  return (
    <nav className="w-full h-16 bg-black/90 backdrop-blur-md text-white border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="w-full h-[70px] bg-[#191919] px-[10px]">
          <div className="h-full flex items-center justify-between px-4 sm:px-6">
            <img src="/logo.png" alt="" />
            <div className="flex items-center gap-4">
              <NavAuth initialAuth={isAuthenticated} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
