"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, Phone, Mail, Globe, Users, TrendingUp, FileCheck, Network, Briefcase, Star } from "lucide-react";
import { staggerContainer, staggerItem, Card } from "./about-sections-shared";

const companyDetailIcons: Record<string, React.ReactNode> = {
  "Legal Name": <Building2 className="w-5 h-5" />,
  Founded: <Calendar className="w-5 h-5" />,
  Headquarters: <MapPin className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Email: <Mail className="w-5 h-5" />,
  Website: <Globe className="w-5 h-5" />,
  Employees: <Users className="w-5 h-5" />,
  "Annual Revenue": <TrendingUp className="w-5 h-5" />,
  "VAT/TAX ID": <FileCheck className="w-5 h-5" />,
  "Parent Company": <Network className="w-5 h-5" />,
  "Business Model": <Briefcase className="w-5 h-5" />,
  Tagline: <Star className="w-5 h-5" />,
};

const companyIntroIcons = [
  <Calendar key="1" className="w-5 h-5" />,
  <Globe key="2" className="w-5 h-5" />,
  <Users key="3" className="w-5 h-5" />,
];

export function CompanyIntroSection({
  imageSrc,
  imageAlt,
  caption,
  narrative,
  stats,
}: {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  narrative: string;
  stats: Array<{ value: string; label: string }>;
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
        <p className="text-sm text-muted-foreground leading-relaxed">{narrative}</p>
        <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-4 mt-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={staggerItem} className="border border-border bg-card p-5 text-center hover:border-primary/50 transition-colors">
              <div className="mx-auto w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground mb-2">
                {companyIntroIcons[i % companyIntroIcons.length]}
              </div>
              <div className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">{stat.value}</div>
              <div className="mt-0.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function CompanyGlanceSection({ companyDetails }: { companyDetails: Array<{ label: string; value: string }> }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {companyDetails.map((item, i) => {
        const icon = companyDetailIcons[item.label] || <FileCheck className="w-5 h-5" />;
        return (
          <motion.div key={item.label} variants={staggerItem}>
            <Card className="p-5 flex items-start gap-4 hover:border-primary/50">
              <div className="shrink-0 w-11 h-11 bg-primary flex items-center justify-center text-primary-foreground">
                {icon}
              </div>
              <div>
                <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{item.value}</dd>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
