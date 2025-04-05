import { NextResponse } from "next/server";
export function middleware(request) {
  const authToken = request.cookies.get("token")?.value;

  if (!authToken) {
    return NextResponse.redirect(new URL("/protected", request.url));
  } else {
    return;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
