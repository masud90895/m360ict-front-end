import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokenKey } from "./helpers/token/tokenKey";

const protectedRoutes = ["/dashboard", "/dashboard/users"];

export default function middleware(req: NextRequest) {
  // if (typeof window !== "undefined") {
  //   const isUserLogin = localStorage.getItem(tokenKey);
  //   if (!isUserLogin && protectedRoutes.includes(req.nextUrl.pathname)) {
  //     const absoluteURL = new URL("/sign-in", req.nextUrl.origin);
  //     return NextResponse.redirect(absoluteURL.toString());
  //   }
  // }

  if (req.nextUrl.pathname === "/") {
    const absoluteURL = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
