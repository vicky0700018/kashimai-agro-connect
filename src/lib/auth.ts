import { useSyncExternalStore } from "react";

/** DEMO ONLY: frontend credential check stored in localStorage. Not secure authentication. */
export const DEMO_ADMIN = {
  email: "admin@shrikashimaiagro.com",
  password: "Agro@123",
} as const;

const KEY = "sska-admin-session";
const listeners = new Set<() => void>();

export function login(email: string, password: string): boolean {
  const ok = email.trim().toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password;
  if (ok) {
    window.localStorage.setItem(KEY, DEMO_ADMIN.email);
    listeners.forEach((l) => l());
  }
  return ok;
}

export function logout() {
  window.localStorage.removeItem(KEY);
  listeners.forEach((l) => l());
}

export function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => e.key === KEY && l();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useAdminSession() {
  return useSyncExternalStore(subscribe, getSession, () => null);
}
