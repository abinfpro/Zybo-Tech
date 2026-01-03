import { cookies } from "next/headers";
import NavAuth from "./NavAuth";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  const isAuthenticated = !!token;

  return (
<nav className="w-full h-16 bg-[#191919] backdrop-blur-md text-white border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="w-full h-full">
          <div className="h-full flex items-center justify-between">
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
