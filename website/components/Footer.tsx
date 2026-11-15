import Link from "next/link";
import { hotel } from "@/lib/hotel";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <p className="footer__text">
          {hotel.address.street}
          <br />
          {hotel.address.city}, {hotel.address.region} {hotel.address.postal}
        </p>
        <ul className="footer__links">
          <li>
            <a href={hotel.mobile.href}>{hotel.mobile.display}</a>
          </li>
          <li>
            <a href={hotel.landline.href}>{hotel.landline.display}</a>
          </li>
          <li>
            <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
          </li>
        </ul>
        <ul className="footer__links">
          <li>
            <Link href="/rooms">Rooms and rates</Link>
          </li>
          <li>
            <Link href="/book">Reserve a room</Link>
          </li>
          <li>
            <a href={hotel.mapsUrl} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </li>
        </ul>
      </div>
      <div className="wrap footer__mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-gold.png" alt="The Maximilian Hotel" width={1200} height={350} loading="lazy" />
      </div>
      <p className="wrap footer__legal">
        Design prototype. Photos, rates and details are subject to the hotel’s confirmation.
      </p>
    </footer>
  );
}
