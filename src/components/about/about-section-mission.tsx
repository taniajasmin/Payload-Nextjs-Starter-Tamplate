"use client";

import { motion } from "framer-motion";
import { Compass, Eye, Star, Zap, Target, Handshake } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem, SectionBadge, GradientCard } from "./about-sections-shared";

const visionIcons = [
  <Star key="1" className="w-5 h-5" />,
  <Zap key="2" className="w-5 h-5" />,
  <Target key="3" className="w-5 h-5" />,
  <Handshake key="4" className="w-5 h-5" />,
];

export function MissionVisionSection({
  missionHeadline, missionDesc, visionHeadline, visionDesc, visionStandards,
}: {
  missionHeadline: string;
  missionDesc: string;
  visionHeadline: string;
  visionDesc: string;
  visionStandards: Array<{ title: string; desc: string }>;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="h-full">
        <GradientCard>
          <SectionBadge icon={<Compass className="w-4 h-4" />}>Mission</SectionBadge>
          <motion.h3 variants={fadeInUp} className="text-2xl font-extrabold leading-[1.1] tracking-tight text-primary mb-4">
            {missionHeadline}
          </motion.h3>
          <motion.p variants={fadeInUp} className="text-muted-foreground leading-relaxed">{missionDesc}</motion.p>
        </GradientCard>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="h-full">
        <GradientCard>
          <SectionBadge icon={<Eye className="w-4 h-4" />}>Vision</SectionBadge>
          <motion.h3 variants={fadeInUp} className="text-2xl font-extrabold leading-[1.1] tracking-tight text-primary mb-4">
            {visionHeadline}
          </motion.h3>
          <motion.p variants={fadeInUp} className="text-muted-foreground leading-relaxed mb-6">{visionDesc}</motion.p>
          <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3">
            {visionStandards.map((item, i) => (
              <motion.div key={item.title} variants={staggerItem} className="flex items-start gap-2.5">
                <div className="shrink-0 w-9 h-9 bg-primary flex items-center justify-center text-primary-foreground">
                  {visionIcons[i % visionIcons.length]}
                </div>
                <div>
                  <h4 className="text-base font-extrabold leading-[1.1] tracking-tight text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </GradientCard>
      </motion.div>
    </div>
  );
}
