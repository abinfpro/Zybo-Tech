import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const pathname = req.nextUrl.pathname;

  if (pathname === "/auth") {
    if (token) {
      return NextResponse.redirect(new URL("/products", req.url));
    }
    return NextResponse.next();
  }

  const protectedRoutes = ["/orders", "/order-success"];

  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders", "/order-success", "/auth"],
};
