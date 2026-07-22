"use client";

import { motion } from "framer-motion";

/* ─── Animation Variants ─── */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: easeOutExpo } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOutExpo } },
};

/* ─── Shared Components ─── */

export function SectionBadge({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <motion.div variants={fadeInUp} className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
      {children}
    </motion.div>
  );
}

export function Card({ children, className = "", hover: _hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`border border-border bg-card transition-colors ${className}`}>
      {children}
    </div>
  );
}

export function GradientCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-border bg-card p-6 md:p-8 h-full ${className}`}>
      {children}
    </div>
  );
}

/* ─── Inline SVG Icons (used by multiple sections) ─── */
export function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}
export function LaptopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}
export function WifiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h.01" /><path d="M2 12.83a22 22 0 0 1 20 0" /><path d="M5 16.22a13 13 0 0 1 14 0" /><path d="M8.5 19.14a6 6 0 0 1 7 0" />
    </svg>
  );
}
export function SmartphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
    </svg>
  );
}
export function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

/* ─── Media Helpers ─── */
export function getMediaUrl(media: unknown): string | undefined {
  if (!media || typeof media !== "object") return undefined;
  const m = media as Record<string, unknown>;
  if (typeof m.url === "string") return m.url;
  if (typeof m.filename === "string") return `/media/${m.filename}`;
  return undefined;
}

export function getMediaAlt(media: unknown): string {
  if (!media || typeof media !== "object") return "";
  const m = media as Record<string, unknown>;
  return typeof m.alt === "string" ? m.alt : "";
}
