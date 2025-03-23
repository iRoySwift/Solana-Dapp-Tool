import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { i18n } from "@iroy/i18n/config";

function getLocale(request: NextRequest): string | undefined {
  let headers = {
    "accept-language": request.headers.get("accept-language") ?? "en;q=0.5",
  };
  let languages = new Negotiator({ headers }).languages();
  const locale = match(languages, i18n.locales, i18n.defaultLocale); // -> 'en'
  return locale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  // 跳过 API 端点
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/avatars/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
