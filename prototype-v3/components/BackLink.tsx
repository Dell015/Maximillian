"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * "Back" that behaves the way people expect: if you came from elsewhere on this site it
 * returns you there (keeping your scroll place), otherwise it takes you to `href`.
 */
export default function BackLink({ href, label }: { href: string; label: string }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className="back"
      onClick={(e) => {
        const ref = document.referrer;
        if (ref && new URL(ref).origin === location.origin && history.length > 1) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
      {label}
    </Link>
  );
}
