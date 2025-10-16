import { cn } from "@/lib/utils";

export function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <path d="M20 4c-7 1-12 6-12 12 0 2.8 2.2 5 5 5 6 0 10-8 7-17Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 15c2-1.5 5-3 8-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <path d="M7 4h10v2a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v4m-5 5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 6h3a4 4 0 0 1-4 4V7a1 1 0 0 1 1-1Zm16 0h-3a4 4 0 0 0 4 4V7a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <rect x="3" y="10" width="4" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10" y="4" width="4" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="13" width="4" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <path d="M6 5a3 3 0 0 1 3-3h10v18H9a3 3 0 0 0-3 3V5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 17.5A3.5 3.5 0 0 1 9.5 14H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PlateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function RecycleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <path d="M7 7 5 10l3 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 5 13 4l1 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 7 19 10l-3 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 17 5 14l3-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 19 13 20l1-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 17 19 14l-3-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RiceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <rect x="4" y="10" width="16" height="8" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 10c1-3 11-3 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BreadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <path d="M4 10a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 10v4m3-4v4m3-4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CurryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none", className)}>
      <path d="M5 12h14a7 7 0 0 1-14 0Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 10c.5-2 3-3 5-3s4.5 1 5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
