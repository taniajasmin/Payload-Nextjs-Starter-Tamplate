"use client";

import { Zap, Truck, ShieldCheck, Globe } from "lucide-react";
import { GlowIcon } from "@/components/home/ui/glow-icon";
import { RevealGroup, Reveal } from "@/components/home/ui/reveal";
import { FEATURE_STRIP_ITEMS, type FeatureItem } from "@/lib/computer-components-content";

const ICONS: Record<FeatureItem["icon"], typeof Zap> = {
  zap: Zap,
  truck: Truck,
  shield: ShieldCheck,
  globe: Globe,
};

const COLORS = ["orange", "blue", "teal", "green"] as const;

/** Slim, glowing band inserted between brand stories for rhythm + reassurance. */
export function CcFeatureStrip() {
  return (
    <section className="border-y border-white/5 bg-neutral-950 text-white">
      <RevealGroup
        className="container-primary grid grid-cols-2 gap-6 py-10 md:grid-cols-4"
        stagger={0.08}
      >
        {FEATURE_STRIP_ITEMS.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal
              key={item.title}
              className="flex items-center gap-3.5"
            >
              <GlowIcon
                icon={Icon}
                color={COLORS[i % COLORS.length]}
                size={22}
                className="h-12 w-12"
              />
              <div>
                <div className="text-sm font-bold text-white">{item.title}</div>
                <div className="text-xs text-neutral-400">{item.copy}</div>
              </div>
            </Reveal>
          );
        })}
      </RevealGroup>
    </section>
  );
}
