import type { Metadata } from "next";
import Header from "@/components/Header";
import "../booking.css";
import BookingFlow from "@/components/BookingFlow";
import { rooms } from "@/lib/hotel";

export const metadata: Metadata = {
  title: "Reserve a room",
  description: "Choose your dates and room at The Maximilian Hotel in Cauayan City.",
};

type Search = Record<string, string | string[] | undefined>;

function one(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const guests = Math.min(4, Math.max(1, Number(one(sp.guests)) || 2));
  const roomParam = one(sp.room);
  const room = rooms.some((r) => r.id === roomParam) ? roomParam : "";

  return (
    <>
      <Header />
      <main id="main" className="page-top">
        <section className="section section--first" aria-labelledby="book-h1">
          <div className="container">
            <h1 id="book-h1" className="h1">
              Reserve a room
            </h1>
            <BookingFlow
              initial={{
                checkIn: /^\d{4}-\d{2}-\d{2}$/.test(one(sp.in)) ? one(sp.in) : "",
                checkOut: /^\d{4}-\d{2}-\d{2}$/.test(one(sp.out)) ? one(sp.out) : "",
                guests,
                room,
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
