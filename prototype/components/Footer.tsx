import Link from "next/link";
import { hotel } from "@/lib/hotel";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__name">{hotel.name}</p>
          <p className="footer__text">
            {hotel.address.street}
            <br />
            {hotel.address.city}, {hotel.address.region} {hotel.address.postal}
          </p>
        </div>
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
      <div className="container footer__legal">
        <p>
          Design prototype. Photos, rates and details are subject to the hotel’s
          confirmation.
        </p>
      </div>
    </footer>
  );
}
