import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Clock3,
  Check,
  ArrowLeft,
  Backpack,
  Compass,
} from "lucide-react";
import { tours } from "../data/tours";
import { Photo, ButtonLink, SectionHeader, TourCard } from "../components/UI";
import NotFound from "./NotFound";
export default function TourDetails() {
  const { id } = useParams();
  const tour = tours.find((t) => t.id === id);
  if (!tour) return <NotFound />;
  return (
    <>
      <div className="container detail-breadcrumb">
        <Link to="/tours">
          <ArrowLeft size={16} /> All experiences
        </Link>
        <span>/ {tour.category}</span>
      </div>
      <header className="detail-hero container">
        <Photo name={tour.image} alt={tour.imageAlt} priority />
        <div className="detail-hero-shade" />
        <div>
          <span className="eyebrow">{tour.label}</span>
          <h1>{tour.title}</h1>
          <div className="tour-meta">
            <span>
              <MapPin size={17} />
              {tour.location}
            </span>
            <span>
              <Clock3 size={17} />
              {tour.duration}
            </span>
            <span>
              <Compass size={17} />
              {tour.category}
            </span>
          </div>
        </div>
      </header>
      <div className="container detail-layout">
        <div>
          <section className="detail-section">
            <span className="eyebrow">THE EXPERIENCE</span>
            <h2>A day a little less ordinary.</h2>
            <p>{tour.description}</p>
            <h3>The highlights</h3>
            <ul className="check-list">
              {tour.highlights.map((item) => (
                <li key={item}>
                  <Check size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <div className="packing-grid">
            <section>
              <h3>
                <Check size={20} /> What’s included
              </h3>
              <ul>
                {tour.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>
                <Backpack size={20} /> What to bring
              </h3>
              <ul>
                {tour.bring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
          <section className="detail-section">
            <span className="eyebrow">A LITTLE PLAN. ROOM TO EXPLORE.</span>
            <h2>Your day, at a glance.</h2>
            <p>
              This is a sample itinerary. Timing and stops would be tailored to
              your group and conditions.
            </p>
            <ol className="itinerary">
              {tour.itinerary.map(([time, activity], index) => (
                <li key={time}>
                  <span className="step">0{index + 1}</span>
                  <div>
                    <span>{time}</span>
                    <h3>{activity}</h3>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="inquiry-card">
          <span className="eyebrow">LET’S MAKE IT YOURS</span>
          <h2>Your island day starts here.</h2>
          <p>
            Share your preferred date, group size, and a little about what you
            have in mind.
          </p>
          <div>
            <Clock3 size={18} />
            {tour.duration}
            <br />
            <MapPin size={18} />
            {tour.location}
          </div>
          <ButtonLink to={`/contact?tour=${tour.id}`}>
            Inquire About This Tour
          </ButtonLink>
          <small>
            Demo experience. No payment or real booking is processed. Photos are
            illustrative.
          </small>
        </aside>
      </div>
      <section className="container section">
        <SectionHeader
          eyebrow="KEEP EXPLORING"
          title="More island possibilities."
        />
        <div className="tour-grid">
          {tours
            .filter((t) => t.id !== id)
            .slice(0, 3)
            .map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
        </div>
      </section>
    </>
  );
}
