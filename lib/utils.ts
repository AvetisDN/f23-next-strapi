import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return process.env.BACKEND_URL ?? "http://localhost:1337";
}

export function getStrapiMedia(url: string | null) {
  if (url === null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export function getVideoId(urlOrId: string) {
  const regExpID = /^[a-zA-Z0-9_-]{11}$/;

  if (regExpID.test(urlOrId)) {
    return urlOrId;
  }

  const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;

  const matchStandard = urlOrId.match(regExpStandard);

  if (matchStandard) {
    return matchStandard[1];
  }

  const matchShorts = urlOrId.match(regExpShorts);

  if (matchShorts) {
    return matchShorts[1];
  }

  return null;
}
