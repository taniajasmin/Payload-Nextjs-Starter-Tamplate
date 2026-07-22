"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem, SectionBadge, Card, getMediaUrl, getMediaAlt } from "./about-sections-shared";

export function ImageSection2({
  headline, subHeadline, images,
}: {
  headline: string;
  subHeadline: string;
  images: Array<{ image?: unknown; caption?: string; description?: string }>;
}) {
  return (
    <>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="text-center">
        <SectionBadge icon={<ImageIcon className="w-4 h-4" />}>Highlights</SectionBadge>
        <motion.h2 variants={fadeInUp} className="text-[length:var(--font-heading)] font-extrabold tracking-tight text-foreground mb-4">{headline}</motion.h2>
        <motion.p variants={fadeInUp} className="text-muted-foreground max-w-xl mx-auto mb-10">{subHeadline}</motion.p>
      </motion.div>

      {images.length > 0 ? (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
          {images.map((item, i) => {
            const url = getMediaUrl(item.image);
            const alt = getMediaAlt(item.image) || item.caption || `Feature image ${i + 1}`;
            const isLarge = i === 0;
            return (
              <motion.div key={i} variants={staggerItem} className={isLarge ? "md:col-span-2" : ""}>
                <Card className="overflow-hidden hover:border-primary/50">
                  <div className={`relative ${isLarge ? "h-80" : "h-64"}`}>
                    {url ? (
                      <img src={url} alt={alt} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-muted flex flex-col items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-2" />
                        <p className="text-[length:var(--font-body)] text-muted-foreground">Upload via Admin → Image Section 2</p>
                      </div>
                    )}
                    {(item.caption || item.description) && (
                      <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 p-4">
                        {item.caption && <p className="text-[length:var(--font-body)] text-white font-semibold">{item.caption}</p>}
                        {item.description && <p className="text-[length:var(--font-body)] text-slate-300 mt-1">{item.description}</p>}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div key={i} variants={staggerItem} className={i === 1 ? "md:col-span-2" : ""}>
              <Card className="overflow-hidden">
                <div className={`relative ${i === 1 ? "h-80" : "h-64"}`}>
                  <div className="w-full h-full bg-muted flex flex-col items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-2" />
                    <p className="text-[length:var(--font-body)] text-muted-foreground">Upload via Admin → Image Section 2</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
