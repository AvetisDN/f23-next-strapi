import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMe } from "./services/get-me";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

function isProtectedRoute(path: string) {
  return protectedRoutes.some((route) => path.startsWith(route));
}
function isAuthRoute(path: string) {
  return authRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const user = await getMe();

  const currentPath = request.nextUrl.pathname;

  if (isProtectedRoute(currentPath) && user.ok === false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthRoute(currentPath) && user.ok === true) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
