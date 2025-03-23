import { NextRequest, NextResponse } from "next/server";
import { loadLocale } from "@iroy/i18n/loadLocale";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") || "en";
  const folder = searchParams.get("folder") || "src/locales";
  const translations = await loadLocale(locale, folder);
  return NextResponse.json(translations);
}
