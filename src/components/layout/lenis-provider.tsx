"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap-setup";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    // Disable on iOS Safari (known touch behavior conflicts)
    const ua = navigator.userAgent;
    const isIOSSafari =
      /iPad|iPhone|iPod/.test(ua) &&
      /Safari/.test(ua) &&
      !/CriOS|FxiOS/.test(ua);
    if (isIOSSafari) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Sync Lenis with GSAP ticker — single rAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Tell Lenis not to use its own rAF
    lenis.options.autoRaf = false;

    return () => {
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
