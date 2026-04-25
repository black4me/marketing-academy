import type { SVGProps } from "react";

const base = "w-5 h-5";

export function Icon({ name, className = base, ...rest }: { name: string; className?: string } & SVGProps<SVGSVGElement>) {
  switch (name) {
    case "brain":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M9 4a3 3 0 0 0-3 3v.5A3.5 3.5 0 0 0 4 11a3.5 3.5 0 0 0 1 2.5A3 3 0 0 0 7 19h2V4Z" />
          <path d="M15 4a3 3 0 0 1 3 3v.5A3.5 3.5 0 0 1 20 11a3.5 3.5 0 0 1-1 2.5A3 3 0 0 1 17 19h-2V4Z" />
          <path d="M12 4v15" />
        </svg>
      );
    case "magnet":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M5 8a7 7 0 0 1 14 0v6a3 3 0 0 1-3 3h-2v-9a2 2 0 0 0-4 0v9H8a3 3 0 0 1-3-3V8Z" />
          <path d="M5 17v3M19 17v3" />
        </svg>
      );
    case "pen":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M16 3l5 5L8 21H3v-5L16 3Z" />
          <path d="M14 5l5 5" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M3 11v2a2 2 0 0 0 2 2h2l8 4V5L7 9H5a2 2 0 0 0-2 2Z" />
          <path d="M18 8a4 4 0 0 1 0 8" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "crown":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M3 18h18l-2-10-4 4-3-7-3 7-4-4-2 10Z" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M3 21h18" /><rect x="5" y="11" width="3" height="8" /><rect x="11" y="6" width="3" height="13" /><rect x="17" y="14" width="3" height="5" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M14 4c4 0 6 2 6 6-3 .5-5 2-7 5l-3-3c3-2 4.5-4 5-7Z" />
          <path d="M9 12 5 8c-2 3 0 6 3 7l1-3Z" />
          <path d="m12 15 3 3c3-1 5-4 3-7l-3 1Z" />
          <path d="M5 19c1-2 3-2 4 0" />
        </svg>
      );
    case "play":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
          <path d="M8 5v14l11-7L8 5Z" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M4 4h11a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4Z" />
          <path d="M4 16a4 4 0 0 1 4-4h11" />
        </svg>
      );
    case "wrench":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M21 7a4 4 0 0 1-5 5l-7 7a2 2 0 1 1-3-3l7-7a4 4 0 0 1 5-5l-2 3 1 2 2 1 2-3Z" />
        </svg>
      );
    case "doc":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case "case":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M3 7h18v12H3z" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "download":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M12 4v12" /><path d="m7 11 5 5 5-5" /><path d="M5 20h14" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="m14 6 6 6-6 6" /><path d="M20 12H4" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="m5 12 5 5L20 7" />
        </svg>
      );
    case "external":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M20 14v6H4V4h6" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
          <path d="M12 2 13.8 9 21 10.5 14.5 13.5 13 21l-3-7L3 12l8-1.5L12 2Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    default:
      return null;
  }
}
