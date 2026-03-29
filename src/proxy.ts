import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getLocaleFromPathname } from "@/lib/locale-routing";
import { REQUEST_LOCALE_HEADER } from "@/lib/server-locale";

function withLocaleHeader(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(REQUEST_LOCALE_HEADER, getLocaleFromPathname(request.nextUrl.pathname));

  return requestHeaders;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = withLocaleHeader(request);

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (pathname === "/admin/login") {
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|favicon.svg|robots.txt|sitemap.xml|manifest.webmanifest).*)"],
};
