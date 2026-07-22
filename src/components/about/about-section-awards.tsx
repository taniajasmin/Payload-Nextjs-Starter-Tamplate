"use client";

import { motion } from "framer-motion";
import { Globe2, Users2, Trophy, Medal } from "lucide-react";
import { staggerContainer, staggerItem, scaleIn, Card } from "./about-sections-shared";

export function AwardsStatsRow() {
  const stats = [
    { icon: <Trophy className="w-5 h-5" />, value: "20+", label: "Years of Excellence" },
    { icon: <Globe2 className="w-5 h-5" />, value: "20+", label: "Global Brand Partners" },
    { icon: <Users2 className="w-5 h-5" />, value: "300+", label: "Team Professionals" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="grid sm:grid-cols-3 gap-5 mb-12"
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="border border-border bg-card p-6 text-center"
        >
          <div className="mx-auto w-12 h-12 bg-primary flex items-center justify-center text-primary-foreground mb-3">
            {stat.icon}
          </div>
          <div className="text-2xl font-extrabold leading-[1.1] tracking-tight text-foreground">{stat.value}</div>
          <div className="mt-1 text-sm font-semibold text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}

export function AwardsSection({ awards }: { awards: Array<{ year: string; title: string; issuer: string; description: string }> }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer} className="grid md:grid-cols-2 gap-5"
    >
      {awards.map((award, i) => (
        <motion.div key={i} variants={staggerItem}>
          <Card className="p-6 md:p-8 relative overflow-hidden h-full">
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary flex items-center justify-center text-primary-foreground">
                  <Trophy className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center border border-border bg-card px-3 py-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {award.year}
                </span>
              </div>
              <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">{award.title}</h3>
              <p className="mt-1.5 text-sm font-semibold text-primary">{award.issuer}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{award.description}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function CertificationsSection({ certifications }: { certifications: Array<{ cert: string; authority: string; status: string }> }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={scaleIn}>
      <div className="border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-4 text-left font-bold text-muted-foreground text-xs uppercase tracking-wider">Certification</th>
                <th className="px-6 py-4 text-left font-bold text-muted-foreground text-xs uppercase tracking-wider">Authority</th>
                <th className="px-6 py-4 text-left font-bold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((row) => (
                <tr key={row.cert} className="border-b border-border transition-colors hover:bg-muted">
                  <td className="px-6 py-4 font-semibold text-foreground flex items-center gap-2">
                    <Medal className="w-4 h-4 text-primary" />
                    {row.cert}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{row.authority}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 border border-border bg-card px-3 py-1 text-xs font-bold text-primary">
                      <span className="w-1.5 h-1.5 bg-primary" />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
