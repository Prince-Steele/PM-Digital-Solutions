import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Mail,
  MessageCircle,
  Compass,
} from "lucide-react";
import { tours } from "../data/tours";
import { PageHeader, Photo, ButtonLink } from "../components/UI";

function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export default function Contact() {
  const [params] = useSearchParams();
  const selected = tours.some((t) => t.id === params.get("tour"))
    ? params.get("tour")
    : "";
  const [success, setSuccess] = useState(false);
  const status = useRef(null);
  useEffect(() => {
    if (success) status.current?.focus();
  }, [success]);
  const submit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    for (const input of form.querySelectorAll('input[type="text"]')) {
      input.setCustomValidity(
        input.required && !input.value.trim()
          ? "Please enter a value, not just spaces."
          : "",
      );
    }
    if (form.reportValidity()) setSuccess(true);
  };
  return (
    <>
      <PageHeader
        eyebrow="YOUR ISLAND DAY STARTS WITH A HELLO"
        title="Let’s plan something memorable."
        text="A mountain escape? A little beach time? Tell us what you’re dreaming of."
      />
      <section className="container contact-layout">
        <aside className="contact-aside">
          <Photo
            name="beach"
            alt="Palm trees along a calm tropical beach"
            priority
          />
          <h2>
            A little inspiration.
            <br />A personal touch.
          </h2>
          <p>
            Share a few details and explore how an easy, personal inquiry could
            work.
          </p>
          <ul className="contact-list">
            <li>
              <Mail />
              <span>
                <strong>Email</strong>hello@islandtrail.example
              </span>
            </li>
            <li>
              <MessageCircle />
              <span>
                <strong>Phone / WhatsApp</strong>+1 (876) 555-0100
              </span>
            </li>
            <li>
              <MapPin />
              <span>
                <strong>Our island</strong>Jamaica, Caribbean
              </span>
            </li>
          </ul>
          <small>
            Fictional company and illustrative contact details. This website
            does not offer real tours.
          </small>
        </aside>
        <div className="booking-panel">
          {success ? (
            <div
              className="success-state"
              ref={status}
              tabIndex={-1}
              role="status"
            >
              <CheckCircle2 size={48} />
              <span className="eyebrow">THANKS FOR TRYING THE DEMO</span>
              <h2>Your sample inquiry is complete.</h2>
              <p>
                Your details passed validation. Nothing was sent or saved, and
                no booking has been made.
              </p>
              <div className="success-actions">
                <button className="button" onClick={() => setSuccess(false)}>
                  Try another inquiry <ArrowUpRight size={18} />
                </button>
                <ButtonLink to="/tours">Explore more tours</ButtonLink>
              </div>
            </div>
          ) : (
            <>
              <div className="form-heading">
                <h2>Your next adventure</h2>
                <p>Fields marked * are required.</p>
              </div>
              <div className="demo-notice">
                <Compass size={21} />
                <p>
                  <strong>This is a demo inquiry form.</strong> Please use
                  sample details. Nothing is sent, saved, or booked.
                </p>
              </div>
              <form
                onSubmit={submit}
                onInput={(event) => event.target.setCustomValidity?.("")}
              >
                <div className="form-grid">
                  <label>
                    Full name *
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      placeholder="e.g. Jamie Traveller"
                    />
                  </label>
                  <label>
                    Email *
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="jamie@example.com"
                    />
                  </label>
                  <label>
                    Phone / WhatsApp
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      maxLength={25}
                      pattern="[+0-9\(\) .\-]{7,25}"
                      title="Use 7–25 characters: numbers, spaces, +, parentheses, or hyphens."
                      placeholder="Include country code"
                    />
                  </label>
                  <label>
                    Tour of interest *
                    <select name="tour" defaultValue={selected} required>
                      <option value="" disabled>
                        Select an experience
                      </option>
                      {tours.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title}
                        </option>
                      ))}
                      <option value="custom">Help me plan a custom day</option>
                    </select>
                  </label>
                  <label>
                    Preferred date *
                    <input
                      name="date"
                      type="date"
                      min={localToday()}
                      required
                    />
                  </label>
                  <label>
                    Number of guests *
                    <input
                      name="guests"
                      type="number"
                      min="1"
                      max="30"
                      step="1"
                      required
                      placeholder="e.g. 2"
                    />
                  </label>
                  <label className="full-width">
                    Pickup area *
                    <input
                      name="pickup"
                      type="text"
                      required
                      maxLength={150}
                      placeholder="e.g. Montego Bay or Kingston"
                    />
                  </label>
                  <label className="full-width">
                    Anything else we should know?
                    <textarea
                      name="message"
                      rows="4"
                      maxLength={2000}
                      placeholder="Your interests, a special occasion, or your ideal kind of day…"
                    />
                  </label>
                </div>
                <button type="submit" className="button submit-button">
                  Send Inquiry <ArrowUpRight size={18} />
                </button>
                <p className="form-footnote">
                  Demo only · No payment required · No personal data stored
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}
