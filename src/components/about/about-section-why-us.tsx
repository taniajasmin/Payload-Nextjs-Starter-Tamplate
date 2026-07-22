"use client";

import { motion } from "framer-motion";
import { Award, Globe, Users, CheckCircle2, Layers, HeadphonesIcon, Zap } from "lucide-react";
import { staggerContainer, staggerItem, Card } from "./about-sections-shared";

const pillarIcons = [
  <Award key="1" className="w-8 h-8" />,
  <Globe className="w-8 h-8" key="2" />,
  <Users className="w-8 h-8" key="3" />,
  <CheckCircle2 className="w-8 h-8" key="4" />,
  <Layers className="w-8 h-8" key="5" />,
  <HeadphonesIcon className="w-8 h-8" key="6" />,
  <Zap className="w-8 h-8" key="7" />,
];

export function ServicePillarsSection({ pillars }: { pillars: Array<{ number: string; title: string; intro: string; benefits: string[] }> }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer} className="space-y-5"
    >
      {pillars.map((pillar, pIdx) => (
        <motion.div key={pillar.number} variants={staggerItem}>
          <Card className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-5 md:gap-6">
              <div className="shrink-0 w-16 h-16 bg-primary flex items-center justify-center self-start text-primary-foreground">
                {pillarIcons[pIdx % pillarIcons.length]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-extrabold text-primary">{pillar.number}</span>
                  <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">{pillar.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{pillar.intro}</p>
                <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                  {pillar.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="shrink-0 w-4 h-4 mt-0.5 text-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
