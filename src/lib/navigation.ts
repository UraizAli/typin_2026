import { useEffect, useState } from "react";

export function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function normalizeInternalHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function navigate(href: string) {
  const target = normalizeInternalHref(href);
  const url = new URL(target, window.location.origin);
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;

  if (nextUrl === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    scrollToHash(url.hash);
    return;
  }

  window.history.pushState({}, "", nextUrl);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function scrollToHash(hash: string) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const id = hash.replace(/^#/, "");
  const target = document.getElementById(id);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function getCurrentLocation() {
  return {
    path: window.location.pathname.replace(/\/+$/, "") || "/",
    hash: window.location.hash,
  };
}

export function useCurrentLocation() {
  const [location, setLocation] = useState(getCurrentLocation);

  useEffect(() => {
    const onChange = () => setLocation(getCurrentLocation());

    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  return location;
}
