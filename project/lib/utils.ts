import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Tracks a click event in Firestore with timestamp, link info, and region/country (via IP geolocation API).
 * @param {Object} params
 * @param {string} params.link - The label or name of the link/CTA.
 * @param {string} params.href - The URL or href of the link.
 * @param {string} [params.userId] - The user ID if available (optional).
 * @param {string} [params.userEmail] - The user email if available (optional).
 */
export async function trackClick({ link, href, userId, userEmail }: { link: string; href: string; userId?: string; userEmail?: string }) {
  try {
    // Get region/country via free IP geolocation API
    let region = null;
    let country = null;
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (res.ok) {
        const data = await res.json();
        region = data.region || null;
        country = data.country_name || null;
      }
    } catch (e) {
      // Ignore geolocation errors
    }
    await addDoc(collection(db, "clicks"), {
      link,
      href,
      userId: userId || null,
      userEmail: userEmail || null,
      timestamp: new Date().toISOString(),
      region,
      country,
    });
  } catch (err) {
    // Optionally log error
    // console.error("Failed to track click", err);
  }
}
