"use client";

import { motion } from "framer-motion";
import { Building2, Handshake, Users, Network, Globe, Briefcase, TrendingUp, Trophy, Zap } from "lucide-react";
import { staggerContainer, staggerItem, Card } from "./about-sections-shared";

const milestoneIcons = [
  <Building2 key="1" className="w-5 h-5" />,
  <Handshake key="2" className="w-5 h-5" />,
  <Users key="3" className="w-5 h-5" />,
  <Network key="4" className="w-5 h-5" />,
  <Globe key="5" className="w-5 h-5" />,
  <Briefcase key="6" className="w-5 h-5" />,
  <TrendingUp key="7" className="w-5 h-5" />,
  <Trophy key="8" className="w-5 h-5" />,
  <Zap key="9" className="w-5 h-5" />,
];

export function MilestonesSection({ milestones }: { milestones: Array<{ year: string; milestone: string }> }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer} className="relative max-w-5xl mx-auto"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-3 bottom-3 left-5 md:left-1/2 w-0.5 -translate-x-1/2 bg-primary"
      />

      <div className="space-y-8 md:space-y-12">
        {milestones.map((m, index) => {
          const isLeft = index % 2 === 0;
          const icon = milestoneIcons[index % milestoneIcons.length];
          return (
            <motion.div
              key={index}
              variants={staggerItem}
              className="relative md:grid md:grid-cols-2 md:items-center"
            >
              <div className={`pl-14 md:pl-0 ${isLeft ? "md:col-start-1 md:pr-10 md:text-right" : "md:col-start-2 md:pl-10"}`}>
                <Card className="p-5 md:p-6 hover:border-primary/50">
                  <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                    <span className="shrink-0 w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground">
                      {icon}
                    </span>
                    <span className="text-[length:var(--font-heading)] font-extrabold text-primary tracking-tight">{m.year}</span>
                  </div>
                  <p className="text-[length:var(--font-body)] text-muted-foreground leading-relaxed">{m.milestone}</p>
                </Card>
              </div>

              <span aria-hidden className="absolute left-5 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                <motion.span
                  className="block w-4 h-4 bg-primary"
                  whileInView={{ scale: [0.4, 1.25, 1] }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
