import Image from "next/image";
import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "webp", "png", "avif"];

function findPhoto(slug: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = path.join(process.cwd(), "public", "images", `${slug}.${ext}`);
    if (fs.existsSync(file)) return `/images/${slug}.${ext}`;
  }
  return null;
}

type Props = {
  slug: string; // file name in /public/images, without extension
  alt: string;
  ratio?: string; // CSS aspect-ratio, e.g. "4 / 3"
  sizes?: string;
  priority?: boolean;
  tone?: "dusk" | "stone";
  className?: string;
};

/**
 * A photo slot. Drop a file named <slug>.jpg (or webp/png) into /public/images
 * and rebuild. Until then a quiet placeholder keeps the layout honest.
 */
export default function Photo({
  slug,
  alt,
  ratio,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority = false,
  tone = "stone",
  className = "",
}: Props) {
  const src = findPhoto(slug);
  return (
    <div
      className={`photo photo--${tone} ${className}`.trim()}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="photo__img"
        />
      ) : (
        <div className="photo__slot" role="img" aria-label={`${alt} (photo to be added)`}>
          <span className="photo__slotname">{slug}</span>
        </div>
      )}
    </div>
  );
}
