/**
 * A short opening: the wordmark draws itself in gold on the hotel's white, then the
 * page lifts like a curtain. Pure CSS and under a second and a half, so it never holds
 * anyone up, and it is skipped entirely for reduced motion.
 */
export default function Preloader() {
  return (
    <div className="pre" aria-hidden="true">
      <div className="pre__mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-gold.png" alt="" width={1200} height={350} />
      </div>
    </div>
  );
}
