"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavAuth({ initialAuth }: { initialAuth: boolean }) {
  const { isAuthenticated, logout } = useAuth();
  const [isAuth, setIsAuth] = useState(initialAuth);
  const pathname = usePathname();

  useEffect(() => {
    setIsAuth(isAuthenticated);
  }, [isAuthenticated]);

  if (isAuth) {
    return (
      <div className="flex items-center gap-6">
        <Link
          href="/orders"
          className="flex items-center text-sm font-medium hover:text-gray-300"
        >
          My Orders
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm font-medium cursor-pointer"
        >
          <img src="/UserCircle.png" className="w-4 h-4" />
          Log Out
        </button>
      </div>
    );
  }

  if (pathname === "/auth") return null;

  return (
    <Link
      href="/auth"
      className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors"
    >
      Log In
    </Link>
  );
}
