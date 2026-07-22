"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Zap, Award, Handshake, RefreshCw, CheckCircle2, HeadphonesIcon } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem, SectionBadge, Card } from "./about-sections-shared";

const coreValueIcons = [
  <Heart key="1" className="w-6 h-6" />,
  <Shield key="2" className="w-6 h-6" />,
  <Zap key="3" className="w-6 h-6" />,
  <Award key="4" className="w-6 h-6" />,
  <Handshake key="5" className="w-6 h-6" />,
  <RefreshCw key="6" className="w-6 h-6" />,
];

const commitmentIcons = [
  <Shield key="1" className="w-6 h-6" />,
  <HeadphonesIcon key="2" className="w-6 h-6" />,
  <Award key="3" className="w-6 h-6" />,
  <RefreshCw key="4" className="w-6 h-6" />,
];

export function ValuesManifestoSection({
  imageSrc,
  imageAlt,
  caption,
  manifesto,
  accent,
}: {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  manifesto: string;
  accent?: string;
}) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16"
    >
      <motion.div variants={staggerItem}>
        <Card className="overflow-hidden hover:border-primary/50">
          <div className="relative h-[300px] md:h-[440px]">
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-slate-950/60" />
            {caption && (
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-sm text-white font-semibold">{caption}</p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <p className="text-sm text-muted-foreground leading-relaxed">{manifesto}</p>
        {accent && (
          <p className="mt-6 text-2xl font-extrabold leading-[1.1] tracking-tight text-primary">{accent}</p>
        )}
      </motion.div>
    </motion.div>
  );
}

export function CoreValuesSection({ coreValues }: { coreValues: Array<{ number: string; title: string; desc: string }> }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer} className="grid md:grid-cols-2 gap-5"
    >
      {coreValues.map((value, i) => (
        <motion.div key={value.number} variants={staggerItem}>
          <Card className="p-6 md:p-8 flex gap-5 hover:border-primary/50">
            <div className="shrink-0 w-14 h-14 bg-primary flex items-center justify-center text-primary-foreground">
              {coreValueIcons[i % coreValueIcons.length]}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-sm font-extrabold text-primary">{value.number}</span>
                <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">{value.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function CommitmentsSection({ commitments }: { commitments: Array<{ title: string; desc: string }> }) {
  return (
    <>
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer} className="text-center mb-10"
      >
        <SectionBadge icon={<CheckCircle2 className="w-4 h-4" />}>In Practice</SectionBadge>
        <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl mb-4">
          Our Commitments <span className="text-primary">in Practice</span>
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
          How our values translate into everyday commitments to every partner we serve.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {commitments.map((c, i) => (
          <motion.div key={c.title} variants={staggerItem}>
            <Card className="p-6 h-full hover:border-primary/50">
              <div className="shrink-0 w-12 h-12 bg-primary flex items-center justify-center text-primary-foreground mb-4">
                {commitmentIcons[i % commitmentIcons.length]}
              </div>
              <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
