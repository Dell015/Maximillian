import type { Metadata, Viewport } from "next";
import "@fontsource/libre-caslon-display/400.css";
import "@fontsource/libre-caslon-text/400.css";
import "@fontsource/libre-caslon-text/400-italic.css";
import "@fontsource-variable/albert-sans/index.css";
import "./globals.css";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import SmoothScroll from "@/components/SmoothScroll";
import { hotel } from "@/lib/hotel";

export const metadata: Metadata = {
  title: {
    default: "The Maximilian Hotel | Hotel in Cauayan City, Isabela",
    template: "%s | The Maximilian Hotel",
  },
  description:
    "Four-star hotel in Cauayan City, Isabela, minutes from Cauayan Airport. Rooms from ₱3,288 a night, a courtyard pool, gardens, Gusto Restaurant and King’s Row. Reserve direct.",
  openGraph: {
    title: "The Maximilian Hotel, Cauayan City",
    description:
      "Rooms from ₱3,288 a night, with a pool, gardens and two restaurants, minutes from Cauayan Airport.",
    type: "website",
    locale: "en_PH",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF9F2",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: hotel.name,
  email: hotel.email,
  telephone: "+63 917 888 5959",
  address: {
    "@type": "PostalAddress",
    streetAddress: hotel.address.street,
    addressLocality: hotel.address.city,
    addressRegion: hotel.address.region,
    postalCode: hotel.address.postal,
    addressCountry: hotel.address.country,
  },
  checkinTime: "14:00",
  checkoutTime: "12:00",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Swimming pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Fitness center", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="page">
          {children}
          <Footer />
        </div>
        <MobileBar />
        <SmoothScroll />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
