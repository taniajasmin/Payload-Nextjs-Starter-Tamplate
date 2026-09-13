"use client";

import { useEffect, useRef } from "react";

/**
 * KoiArt — animated underwater scene: two glowing koi circling each other
 * beneath a rippling water surface, with light shafts and drifting bubbles.
 * Pure canvas, no external assets/libraries.
 *
 * Usage:
 *   import KoiArt from "@/components/koi-art";
 *   <KoiArt className="w-full h-[600px] rounded-xl" />
 *
 * Honors prefers-reduced-motion: warms up the trails and paints one
 * still frame instead of animating.
 */
export default function KoiArt({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ---- Bubbles ----
    type Bubble = { x: number; y: number; r: number; speed: number; sway: number; phase: number; alpha: number };
    const bubbles: Bubble[] = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 2.2,
      speed: 4 + Math.random() * 10,
      sway: 6 + Math.random() * 14,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.15 + Math.random() * 0.5,
    }));

    // ---- Koi trail buffers ----
    const TRAIL_LEN = 46;
    type Trail = { points: { x: number; y: number }[]; phase: number; dir: 1 | -1; hue: string };
    const koi: Trail[] = [
      { points: [], phase: 0, dir: 1, hue: "200,225,255" },
      { points: [], phase: Math.PI, dir: -1, hue: "180,210,255" },
    ];

    const kioPos = (phase: number, time: number, dir: number, cx: number, cy: number, r: number) => {
      const angle = phase + time * 0.35 * dir;
      // figure-eight-ish orbit for organic circling motion
      const wob = Math.sin(time * 0.6 + phase) * r * 0.12;
      return {
        x: cx + Math.cos(angle) * (r + wob),
        y: cy + Math.sin(angle * 1.15) * (r * 0.62),
      };
    };

    const drawFrame = (scheduleNext: boolean) => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // deep water gradient background
      const bg = ctx.createRadialGradient(
        width * 0.5, height * 0.15, height * 0.1,
        width * 0.5, height * 0.6, height * 1.1
      );
      bg.addColorStop(0, "#0c1a2b");
      bg.addColorStop(0.5, "#050d18");
      bg.addColorStop(1, "#01050a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // ---- light shafts from the surface ----
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const shaftCount = 3;
      for (let i = 0; i < shaftCount; i++) {
        const cx = width * (0.35 + i * 0.18) + Math.sin(t * 0.15 + i) * 40;
        const grad = ctx.createLinearGradient(cx, 0, cx + 60, height * 0.9);
        grad.addColorStop(0, "rgba(210,230,255,0.16)");
        grad.addColorStop(0.4, "rgba(180,210,255,0.05)");
        grad.addColorStop(1, "rgba(180,210,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(cx - 50, 0);
        ctx.lineTo(cx + 70, 0);
        ctx.lineTo(cx + 220, height);
        ctx.lineTo(cx - 180, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // ---- rippling surface line ----
      ctx.save();
      ctx.strokeStyle = "rgba(200,220,255,0.25)";
      ctx.lineWidth = 1.5;
      for (let band = 0; band < 3; band++) {
        ctx.beginPath();
        const yBase = 14 + band * 10;
        for (let x = 0; x <= width; x += 8) {
          const y = yBase + Math.sin(x * 0.04 + t * 1.4 + band) * 4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.globalAlpha = 0.3 - band * 0.08;
        ctx.stroke();
      }
      ctx.restore();

      // ---- koi (glowing trailing swoosh) ----
      const cx = width / 2;
      const cy = height * 0.56;
      const r = Math.min(width, height) * 0.22;

      koi.forEach((k) => {
        const p = kioPos(k.phase, t, k.dir, cx, cy, r);
        k.points.push(p);
        if (k.points.length > TRAIL_LEN) k.points.shift();

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        for (let i = 1; i < k.points.length; i++) {
          const a = k.points[i - 1];
          const b = k.points[i];
          const progress = i / k.points.length; // 0 tail -> 1 head
          const segmentWidth = 1 + progress * 5;
          const alpha = Math.pow(progress, 1.6) * 0.9;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineWidth = segmentWidth;
          ctx.strokeStyle = `rgba(${k.hue},${alpha})`;
          ctx.shadowColor = `rgba(${k.hue},0.9)`;
          ctx.shadowBlur = 10 * progress;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // head glow
        const head = k.points[k.points.length - 1];
        if (head) {
          const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 14);
          glow.addColorStop(0, `rgba(${k.hue},0.9)`);
          glow.addColorStop(1, `rgba(${k.hue},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 14, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // ---- bubbles ----
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      bubbles.forEach((b) => {
        b.y -= (b.speed / height) * 0.016;
        if (b.y < -0.02) {
          b.y = 1.02;
          b.x = Math.random();
        }
        const x = (b.x + Math.sin(t * 0.5 + b.phase) * (b.sway / width)) * width;
        const y = b.y * height;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, b.r * 3);
        glow.addColorStop(0, `rgba(210,230,255,${b.alpha})`);
        glow.addColorStop(1, "rgba(210,230,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, b.r * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      if (scheduleNext) {
        raf = requestAnimationFrame(() => drawFrame(true));
      }
    };

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (prefersReduced) {
      // Advance the simulation so the trails are populated, then leave the
      // final frame painted — no continuous animation.
      for (let i = 0; i < 60; i++) drawFrame(false);
    } else {
      raf = requestAnimationFrame(() => drawFrame(true));
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", background: "#01050a" }}
    />
  );
}
