"use client";

interface GoogleMapEmbedProps {
  src?: string;
  title?: string;
  height?: string;
}

const fallbackSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.9!2d55.297!3d25.258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDar%20Al%20Riffa%20Building%2C%20Khalid%20Bin%20Al%20Waleed%20Rd%2C%20Bur%20Dubai!5e0!3m2!1sen!2sae!4v1234567890";

export function GoogleMapEmbed({
  src,
  title = "Simal Technologies — Dubai Office Location",
  height = "400px",
}: GoogleMapEmbedProps) {
  return (
    <div className="overflow-hidden border border-border">
      <iframe
        src={src || fallbackSrc}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}
