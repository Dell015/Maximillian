import Link from "next/link";
import { hotel } from "@/lib/hotel";

/** Pinned to the bottom of phone screens: tap to call, tap to reserve. */
export default function MobileBar() {
  return (
    <div className="mobile-bar" role="navigation" aria-label="Quick actions">
      <a href={hotel.mobile.href} className="mobile-bar__call">
        Call the hotel
      </a>
      <Link href="/book" className="mobile-bar__book">
        Reserve
      </Link>
    </div>
  );
}
