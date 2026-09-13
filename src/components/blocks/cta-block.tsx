import { Phone, Mail, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface CTABlockProps {
  heading?: string;
  description?: string;
  phoneLabel?: string;
  phoneNumber?: string;
  emailLabel?: string;
  emailAddress?: string;
  demoLinkLabel?: string;
  demoLinkUrl?: string;
}

export function CTABlock({
  heading,
  description,
  phoneLabel,
  phoneNumber,
  emailLabel,
  emailAddress,
  demoLinkLabel,
  demoLinkUrl,
}: CTABlockProps) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground py-16 md:py-20 lg:py-24">
      {/* Subtle film-grain texture over the solid band */}
      <div className="noise-overlay" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {heading && (
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {heading}
            </h2>
          </Reveal>
        )}
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {phoneLabel && phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 font-medium transition-colors duration-300 hover:bg-white/10"
              >
                <Phone className="w-4 h-4" />
                <span>{phoneLabel}</span>
              </a>
            )}
            {emailLabel && emailAddress && (
              <a
                href={`mailto:${emailAddress}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 font-medium transition-colors duration-300 hover:bg-white/10"
              >
                <Mail className="w-4 h-4" />
                <span>{emailLabel}</span>
              </a>
            )}
            {demoLinkLabel && demoLinkUrl && (
              <a
                href={demoLinkUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-semibold transition-colors duration-300 hover:bg-neutral-100"
              >
                <span>{demoLinkLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
