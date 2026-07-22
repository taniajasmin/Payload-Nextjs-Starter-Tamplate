"use client";

import { motion } from "framer-motion";
import { User, Building2, Landmark } from "lucide-react";
import { staggerContainer, staggerItem, Card, MonitorIcon, LaptopIcon, WifiIcon, SmartphoneIcon, ServerIcon } from "./about-sections-shared";

export function LeadershipSection({ boardOfDirectors }: { boardOfDirectors: Array<{ name: string; code: string; role: string; profile: string }> }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer} className="grid md:grid-cols-3 gap-6"
    >
      {boardOfDirectors.map((director) => (
        <motion.div key={director.code} variants={staggerItem}>
          <Card className="p-6 md:p-8 text-center relative overflow-hidden h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <div className="mx-auto h-24 w-24 bg-primary flex items-center justify-center mb-5 text-primary-foreground">
              <User className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">{director.name}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{director.role}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{director.profile}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

const divIcons = [
  <MonitorIcon key="1" className="w-6 h-6" />,
  <LaptopIcon key="2" className="w-6 h-6" />,
  <WifiIcon key="3" className="w-6 h-6" />,
  <SmartphoneIcon key="4" className="w-6 h-6" />,
  <Building2 key="5" className="w-6 h-6" />,
  <ServerIcon key="6" className="w-6 h-6" />,
  <Landmark key="7" className="w-6 h-6" />,
];

export function DivisionsSection({ divisions }: { divisions: Array<{ name: string; size: string; focus: string }> }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {divisions.map((div, i) => (
        <motion.div key={div.name} variants={staggerItem}>
          <Card className="p-5 relative overflow-hidden h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground">
                  {divIcons[i % divIcons.length]}
                </div>
                <h4 className="font-extrabold text-foreground">{div.name}</h4>
              </div>
              <span className="text-xs font-bold text-muted-foreground border border-border bg-card px-3 py-1">{div.size}</span>
            </div>
            <p className="text-sm text-muted-foreground">{div.focus}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
