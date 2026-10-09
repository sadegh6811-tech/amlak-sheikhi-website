import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-change-me-in-production-min-32-chars"
);

const PUBLIC_PATHS = ["/panel-sheikhi-2024/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/panel-sheikhi-2024")) {
    if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }

    const token = request.cookies.get("sheikhi_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/panel-sheikhi-2024/login", request.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/panel-sheikhi-2024/login", request.url));
      res.cookies.delete("sheikhi_session");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel-sheikhi-2024/:path*"],
};
