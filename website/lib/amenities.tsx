import {
  Coffee, Wifi, Wind, Tv, Lock, Sparkles, ConciergeBell, WavesLadder, Car, ArrowUpFromLine,
  ShieldCheck, Briefcase, Usb, Plane, Wine, ShowerHead, Bath, Sofa, BedSingle, Trees,
  type LucideIcon,
} from "lucide-react";
import type { Amenity } from "@/lib/hotel";

export const amenity: Record<Amenity, { label: string; Icon: LucideIcon }> = {
  breakfast: { label: "Breakfast included", Icon: Coffee },
  wifi: { label: "Free Wi-Fi", Icon: Wifi },
  aircon: { label: "Air-conditioned", Icon: Wind },
  tv: { label: "Smart TV", Icon: Tv },
  safe: { label: "Electronic safe", Icon: Lock },
  toiletries: { label: "Toiletries", Icon: Sparkles },
  roomservice: { label: "Room service", Icon: ConciergeBell },
  pool: { label: "Pool access", Icon: WavesLadder },
  parking: { label: "Free parking", Icon: Car },
  elevator: { label: "24/7 elevator", Icon: ArrowUpFromLine },
  security: { label: "Security in common areas", Icon: ShieldCheck },
  desk: { label: "Work desk", Icon: Briefcase },
  usb: { label: "USB charging", Icon: Usb },
  airport: { label: "Airport transfers", Icon: Plane },
  minibar: { label: "Mini bar", Icon: Wine },
  fullbath: { label: "Full bath amenities", Icon: ShowerHead },
  bathtub: { label: "Bathtub", Icon: Bath },
  sofabed: { label: "Sofa bed", Icon: BedSingle },
  lounge: { label: "Separate lounge", Icon: Sofa },
  garden: { label: "Pool and garden view", Icon: Trees },
};

export function Amen({ id, compact = false }: { id: Amenity; compact?: boolean }) {
  const a = amenity[id];
  return (
    <li className={`amen${compact ? " amen--compact" : ""}`}>
      <a.Icon aria-hidden="true" strokeWidth={1.4} />
      <span>{a.label}</span>
    </li>
  );
}
