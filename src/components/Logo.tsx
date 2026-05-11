import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * Kuwex Studios logo component. Uses the raster asset at /logo.jpg
 * but also falls back to a CSS-rendered wordmark if preferred (set `text`).
 */
export function Logo({
  size = 40,
  withWordmark = false,
  className,
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className="relative overflow-hidden rounded-xl ring-1 ring-white/10 shadow-glow"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.jpg"
          alt="Kuwex Studios"
          fill
          priority
          sizes={`${size}px`}
          className="object-cover"
        />
      </div>
      {withWordmark && (
        <span className="text-lg font-semibold tracking-tight">
          Kuwex <span className="text-accent">Studios</span>
        </span>
      )}
    </div>
  );
}

/** Pure CSS wordmark — used on big hero if we ever want to avoid the raster. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-extrabold tracking-tight', className)}>
      <span className="text-white">KuWe</span>
      <span className="text-accent">X</span>
    </span>
  );
}
