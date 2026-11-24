import { useState, type ImgHTMLAttributes } from "react";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };

/** Image with lazy loading and a branded fallback when a file fails to load. */
export function SmartImage({ src, alt, className, loading = "lazy", ...rest }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("flex items-center justify-center bg-sage text-leaf", className)}
      >
        <Sprout className="h-10 w-10 opacity-60" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailedSrc(src)}
      className={cn("object-cover", className)}
      {...rest}
    />
  );
}
