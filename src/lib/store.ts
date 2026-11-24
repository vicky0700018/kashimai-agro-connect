import { useSyncExternalStore } from "react";
import { createSeedData } from "./seed";
import type { AppData, CompanySettings, Enquiry, EnquiryStatus, SiteContent } from "./types";

/**
 * Frontend-only demo data store. Persists to localStorage so admin edits show up on the
 * public pages immediately and survive a refresh. Not a database and not secure.
 */
export const STORAGE_KEY = "sska-agro-data-v1";

const listeners = new Set<() => void>();
let state: AppData | null = null;
let serverSnapshot: AppData | null = null;

function getServerSnapshot(): AppData {
  return (serverSnapshot ??= createSeedData());
}

function read(): AppData {
  const seed = createSeedData();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const p = JSON.parse(raw) as Partial<AppData>;
    return {
      ...seed,
      ...p,
      version: 1,
      content: {
        ...seed.content,
        ...p.content,
        sections: { ...seed.content.sections, ...p.content?.sections },
      },
      settings: {
        ...seed.settings,
        ...p.settings,
        social: { ...seed.settings.social, ...p.settings?.social },
      },
    };
  } catch {
    return seed;
  }
}

export function getState(): AppData {
  if (typeof window === "undefined") return getServerSnapshot();
  return (state ??= read());
}

function emit() {
  listeners.forEach((l) => l());
}

/** Applies an update; returns false when the browser storage is full (e.g. a large upload). */
export function setState(updater: (s: AppData) => AppData): boolean {
  const next = updater(getState());
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return false;
  }
  state = next;
  emit();
  return true;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = read();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useAppData(): AppData {
  return useSyncExternalStore(subscribe, getState, getServerSnapshot);
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

type CollectionKey = "products" | "activities" | "gallery" | "enquiries" | "directors";
type ItemOf<K extends CollectionKey> = AppData[K][number];

export function saveItem<K extends CollectionKey>(key: K, item: ItemOf<K>): boolean {
  return setState((s) => {
    const list = s[key] as ItemOf<K>[];
    const exists = list.some((i) => i.id === item.id);
    const next = exists ? list.map((i) => (i.id === item.id ? item : i)) : [item, ...list];
    return { ...s, [key]: next };
  });
}

export function deleteItem(key: CollectionKey, id: string): boolean {
  return setState((s) => ({
    ...s,
    [key]: (s[key] as { id: string }[]).filter((i) => i.id !== id),
  }));
}

export type EnquiryInput = Omit<Enquiry, "id" | "status" | "createdAt">;

export function addEnquiry(input: EnquiryInput): Enquiry {
  const enquiry: Enquiry = {
    ...input,
    id: newId("enq"),
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  setState((s) => ({ ...s, enquiries: [enquiry, ...s.enquiries] }));
  return enquiry;
}

export function setEnquiryStatus(id: string, status: EnquiryStatus): boolean {
  return setState((s) => ({
    ...s,
    enquiries: s.enquiries.map((e) => (e.id === id ? { ...e, status } : e)),
  }));
}

export function updateContent(patch: Partial<SiteContent>): boolean {
  return setState((s) => ({ ...s, content: { ...s.content, ...patch } }));
}

export function updateSettings(patch: Partial<CompanySettings>): boolean {
  return setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
}

export function setCategories(kind: "productCategories" | "galleryCategories", list: string[]) {
  return setState((s) => ({ ...s, [kind]: list }));
}

export function resetDemoData() {
  return setState(() => createSeedData());
}

/* ---------- Public selectors ---------- */
export function publicProducts(d: AppData) {
  return d.products.filter((p) => p.published);
}
export function publicActivities(d: AppData) {
  return d.activities.filter((a) => a.published);
}

/* ---------- Contact helpers ---------- */
export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}
/** WhatsApp link for the supplied company number (Indian +91 prefix for 10-digit numbers). */
export function whatsappLink(phone: string) {
  const d = phoneDigits(phone);
  return `https://wa.me/${d.length === 10 ? `91${d}` : d}`;
}
export function mapEmbedUrl(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}
export function mapLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
