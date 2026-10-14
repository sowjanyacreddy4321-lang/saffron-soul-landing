import { useState, type ImgHTMLAttributes } from "react";
import { Flower2, Star } from "lucide-react";
import { photos } from "@/data/restaurant";

export function Photo({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  return (
    <img {...props} src={failed ? photos.feast : src} alt={alt} onError={() => setFailed(true)} />
  );
}
export function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      aria-label="Saffron & Soul home"
      className={`wordmark ${footer ? "wordmark-footer" : ""}`}
    >
      <Flower2 aria-hidden="true" />
      <span>
        SAFFRON <span className="wordmark-amp">&</span> SOUL
        <small>CONTEMPORARY INDIAN KITCHEN</small>
      </span>
    </a>
  );
}
export function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} aria-hidden="true" />
      ))}
    </span>
  );
}
export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
