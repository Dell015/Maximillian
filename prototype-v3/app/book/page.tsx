import type { Metadata } from "next";
import Header from "@/components/Header";
import BookingFlow from "@/components/BookingFlow";
import { rooms } from "@/lib/hotel";
import "../rooms.css";
import "../booking.css";

export const metadata: Metadata = {
  title: "Book a room",
  description: "Choose your dates and room at The Maximilian Hotel in Cauayan City. Breakfast included, free cancellation up to 48 hours before check-in.",
};

type Search = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));
const date = (v: string) => (/^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");

export default async function BookPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const room = one(sp.room);
  return (
    <>
      <Header />
      <main id="main" className="bkpage">
        <div className="wrap">
          <BookingFlow
            initial={{
              checkIn: date(one(sp.in)),
              checkOut: date(one(sp.out)),
              guests: Math.min(4, Math.max(1, Number(one(sp.guests)) || 2)),
              room: rooms.some((r) => r.id === room) ? room : "",
            }}
          />
        </div>
      </main>
    </>
  );
}
