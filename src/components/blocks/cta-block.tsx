import { Phone, Mail, ArrowRight } from "lucide-react";

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
    <section className="py-16 sm:py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {heading}
          </h2>
        )}
        {description && (
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {phoneLabel && phoneNumber && (
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
            >
              <Phone className="w-5 h-5" />
              <span>{phoneLabel}</span>
            </a>
          )}
          {emailLabel && emailAddress && (
            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
            >
              <Mail className="w-5 h-5" />
              <span>{emailLabel}</span>
            </a>
          )}
          {demoLinkLabel && demoLinkUrl && (
            <a
              href={demoLinkUrl}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-primary hover:bg-neutral-100 transition-colors font-semibold"
            >
              <span>{demoLinkLabel}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
