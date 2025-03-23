"use client";

import { Event, trackEvent } from "@/utils/events";

interface CopyButtonProps {
  value: string;
  src?: string;
  event?: Event["name"];
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value);
  if (event) {
    trackEvent(event);
  }
}
