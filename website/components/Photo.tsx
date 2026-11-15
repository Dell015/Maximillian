import Image from "next/image";
import manifest from "@/lib/photos.json";

type Entry = { w: number; h: number; c: string };
const photos = manifest as Record<string, Entry>;

type Props = {
  slug: string; // key in lib/photos.json, file in /public/images
  alt: string;
  ratio?: string; // CSS aspect-ratio; the photo is cropped to it
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Extra class on the <img>, for parallax/scale effects. */
  imgClass?: string;
  /** Fill the parent instead of keeping the photo's own proportions. */
  fill?: boolean;
  /** Drift the image ±n% against the scroll (see Motion.tsx). */
  par?: number;
};

/**
 * One photograph, held in a frame. The frame is tinted with the photo's own average
 * colour so nothing flashes white while it loads, and keeps its shape so the page
 * never jumps.
 */
export default function Photo({
  slug,
  alt,
  ratio,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority = false,
  className = "",
  imgClass = "",
  fill = false,
  par,
}: Props) {
  const p = photos[slug];
  if (!p) {
    return (
      <div className={`photo ${className}`.trim()} style={ratio ? { aspectRatio: ratio } : undefined}>
        <div className="photo__missing" role="img" aria-label={`${alt} (photo to be added)`} />
      </div>
    );
  }
  return (
    <div
      className={`photo ${className}`.trim()}
      style={
        fill
          ? { backgroundColor: p.c }
          : { aspectRatio: ratio ?? `${p.w} / ${p.h}`, backgroundColor: p.c }
      }
    >
      <Image
        src={`/images/${slug}.jpg`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`photo__img${par ? " photo__img--par" : ""} ${imgClass}`.trim()}
        {...(par ? { "data-par": par } : {})}
      />
    </div>
  );
}
