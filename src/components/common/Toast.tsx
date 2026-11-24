import { useSyncExternalStore } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastItem = { id: number; message: string; tone: "success" | "error" };
let items: ToastItem[] = [];
const listeners = new Set<() => void>();
const EMPTY: ToastItem[] = [];
let counter = 0;

export function toast(message: string, tone: ToastItem["tone"] = "success") {
  const id = ++counter;
  items = [...items, { id, message, tone }];
  listeners.forEach((l) => l());
  setTimeout(() => {
    items = items.filter((t) => t.id !== id);
    listeners.forEach((l) => l());
  }, 3200);
}

export function Toaster() {
  const list = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => items,
    () => EMPTY,
  );
  return (
    <div className="pointer-events-none fixed left-1/2 top-5 z-[100] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col gap-2">
      {list.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            "pointer-events-auto flex items-start gap-3 rounded-2xl border bg-card px-4 py-3 text-sm font-medium shadow-lift animate-in fade-in slide-in-from-top-2",
            t.tone === "error" ? "border-destructive/30 text-destructive" : "border-leaf/30 text-deep",
          )}
        >
          {t.tone === "error" ? (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
          )}
          {t.message}
        </div>
      ))}
    </div>
  );
}
