/**
 * Hero booking bar. A plain GET form, so it works before any JavaScript loads
 * and hands the chosen dates to the booking page through the URL.
 */
export default function BookingBar() {
  return (
    <form className="dock" action="/book" method="get" aria-label="Check availability">
      <div className="field">
        <label htmlFor="dock-in">Check in</label>
        <input id="dock-in" name="in" type="date" required />
      </div>
      <div className="field">
        <label htmlFor="dock-out">Check out</label>
        <input id="dock-out" name="out" type="date" required />
      </div>
      <div className="field">
        <label htmlFor="dock-guests">Guests</label>
        <select id="dock-guests" name="guests" defaultValue="2">
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
        </select>
      </div>
      <button type="submit" className="btn dock__submit">
        Check availability
      </button>
    </form>
  );
}
