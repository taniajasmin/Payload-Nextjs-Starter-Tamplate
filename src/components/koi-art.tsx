"use client";

import { useEffect, useRef } from "react";

/**
 * KoiArt — full-bleed animated hero background: two glowing koi with real
 * fish silhouettes (head, tapering body, forked tail) circling each other
 * underwater, beneath light shafts, a rippling surface line, and drifting
 * bubbles. No external assets.
 *
 * IMPORTANT — the canvas fills whatever size its parent gives it. The
 * parent must be positioned with an explicit size, e.g. the hero section
 * (`relative overflow-hidden min-h-[66.67vh]`) or:
 *
 *   <div className="relative h-[640px] w-full overflow-hidden">
 *     <KoiArt className="absolute inset-0" />
 *     <div className="relative z-10"> ...hero text/buttons... </div>
 *   </div>
 *
 * Without a sized parent the canvas renders as a sliver.
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
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ---- bubbles ----
    type Bubble = { x: number; y: number; r: number; speed: number; sway: number; phase: number; alpha: number };
    const bubbles: Bubble[] = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 2.6,
      speed: 6 + Math.random() * 14,
      sway: 8 + Math.random() * 18,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.2 + Math.random() * 0.55,
    }));

    // ---- koi trails: store head position + facing angle each frame ----
    const TRAIL_LEN = 34;
    type Pt = { x: number; y: number; angle: number };
    type Koi = { points: Pt[]; phase: number; dir: 1 | -1; hue: string; scale: number };
    const koi: Koi[] = [
      { points: [], phase: 0.2, dir: 1, hue: "205,228,255", scale: 1 },
      { points: [], phase: Math.PI + 0.3, dir: -1, hue: "175,205,255", scale: 0.86 },
    ];

    const koiPos = (phase: number, time: number, dir: number, cx: number, cy: number, r: number) => {
      const angle = phase + time * 0.3 * dir;
      const wob = Math.sin(time * 0.5 + phase) * r * 0.1;
      const x = cx + Math.cos(angle) * (r + wob);
      const y = cy + Math.sin(angle * 1.2) * (r * 0.58);
      return { x, y, angle };
    };

    // draws one fish-shaped ribbon along a trail of points (widest near head, tapering to a forked tail)
    const drawKoiBody = (k: Koi) => {
      const pts = k.points;
      if (pts.length < 4) return;
      const n = pts.length;

      // width profile: bulge near head (end of array), taper toward tail (start)
      const widthAt = (i: number) => {
        const p = i / (n - 1); // 0 tail -> 1 head
        const base = 3 + Math.pow(p, 1.4) * 15 * k.scale;
        return base;
      };

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      // build offset polygon (top edge then bottom edge reversed)
      const top: { x: number; y: number }[] = [];
      const bottom: { x: number; y: number }[] = [];
      for (let i = 0; i < n; i++) {
        const cur = pts[i];
        const prev = pts[Math.max(0, i - 1)];
        const next = pts[Math.min(n - 1, i + 1)];
        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const w = widthAt(i);
        top.push({ x: cur.x + nx * w, y: cur.y + ny * w });
        bottom.push({ x: cur.x - nx * w, y: cur.y - ny * w });
      }

      const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[n - 1].x, pts[n - 1].y);
      grad.addColorStop(0, `rgba(${k.hue},0)`);
      grad.addColorStop(0.55, `rgba(${k.hue},0.55)`);
      grad.addColorStop(1, `rgba(${k.hue},0.95)`);

      ctx.beginPath();
      ctx.moveTo(top[0].x, top[0].y);
      for (let i = 1; i < top.length; i++) ctx.lineTo(top[i].x, top[i].y);
      for (let i = bottom.length - 1; i >= 0; i--) ctx.lineTo(bottom[i].x, bottom[i].y);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.shadowColor = `rgba(${k.hue},0.9)`;
      ctx.shadowBlur = 16;
      ctx.fill();

      // forked tail flick at the tail end (start of array)
      const tail = pts[0];
      const tailNext = pts[Math.min(3, n - 1)];
      const tAngle = Math.atan2(tail.y - tailNext.y, tail.x - tailNext.x);
      const flick = Math.sin(t * 3 + k.phase) * 0.35;
      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);
      ctx.lineTo(
        tail.x + Math.cos(tAngle + 0.5 + flick) * 20 * k.scale,
        tail.y + Math.sin(tAngle + 0.5 + flick) * 20 * k.scale
      );
      ctx.lineTo(
        tail.x + Math.cos(tAngle - 0.5 + flick) * 20 * k.scale,
        tail.y + Math.sin(tAngle - 0.5 + flick) * 20 * k.scale
      );
      ctx.closePath();
      ctx.fillStyle = `rgba(${k.hue},0.5)`;
      ctx.shadowBlur = 10;
      ctx.fill();

      // head glow (bright core so it reads as a fish head, not a line end)
      const head = pts[n - 1];
      const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 22 * k.scale);
      glow.addColorStop(0, "rgba(255,255,255,0.95)");
      glow.addColorStop(0.4, `rgba(${k.hue},0.7)`);
      glow.addColorStop(1, `rgba(${k.hue},0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 22 * k.scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawFrame = (scheduleNext: boolean) => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // deep water background
      const bg = ctx.createRadialGradient(
        width * 0.5, height * 0.1, height * 0.05,
        width * 0.5, height * 0.65, height * 1.15
      );
      bg.addColorStop(0, "#0e1f33");
      bg.addColorStop(0.45, "#071120");
      bg.addColorStop(1, "#000308");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // vignette for depth
      const vig = ctx.createRadialGradient(
        width * 0.5, height * 0.5, height * 0.2,
        width * 0.5, height * 0.5, height * 0.9
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      // light shafts from the surface
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 4; i++) {
        const cx = width * (0.18 + i * 0.24) + Math.sin(t * 0.15 + i * 1.7) * 50;
        const grad = ctx.createLinearGradient(cx, 0, cx + 80, height);
        grad.addColorStop(0, "rgba(215,232,255,0.22)");
        grad.addColorStop(0.35, "rgba(190,215,255,0.08)");
        grad.addColorStop(1, "rgba(190,215,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(cx - 60, 0);
        ctx.lineTo(cx + 90, 0);
        ctx.lineTo(cx + 260, height);
        ctx.lineTo(cx - 220, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // rippling surface lines near the top
      ctx.save();
      for (let band = 0; band < 3; band++) {
        ctx.beginPath();
        const yBase = 10 + band * 9;
        for (let x = 0; x <= width; x += 8) {
          const y = yBase + Math.sin(x * 0.045 + t * 1.5 + band) * 4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(205,225,255,0.28)";
        ctx.lineWidth = 1.4;
        ctx.globalAlpha = 0.32 - band * 0.08;
        ctx.stroke();
      }
      ctx.restore();

      // koi
      const cx = width / 2;
      const cy = height * 0.56;
      const r = Math.min(width, height) * 0.26;
      koi.forEach((k) => {
        const p = koiPos(k.phase, t, k.dir, cx, cy, r);
        k.points.push(p);
        if (k.points.length > TRAIL_LEN) k.points.shift();
        drawKoiBody(k);
      });

      // bubbles
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
        const glow = ctx.createRadialGradient(x, y, 0, x, y, b.r * 3.2);
        glow.addColorStop(0, `rgba(215,232,255,${b.alpha})`);
        glow.addColorStop(1, "rgba(215,232,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, b.r * 3.2, 0, Math.PI * 2);
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
      style={{ display: "block", width: "100%", height: "100%", background: "#000308" }}
    />
  );
}
