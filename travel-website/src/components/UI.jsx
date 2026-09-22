import { ArrowUpRight, Clock3, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { imagePath } from "../data/tours";

export function Photo({ name, alt, className = "", priority = false, sizes }) {
  return (
    <img
      className={className}
      src={imagePath(name)}
      srcSet={`${imagePath(name, true)} 640w, ${imagePath(name)} 1600w`}
      sizes={sizes || (priority ? "100vw" : "(max-width: 650px) 100vw, 50vw")}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={(event) => {
        if (event.currentTarget.dataset.fallback) return;
        event.currentTarget.dataset.fallback = "true";
        event.currentTarget.srcset = "";
        event.currentTarget.src = "/images/fallback.svg";
      }}
    />
  );
}
export function ButtonLink({ to, children, light = false, outline = false }) {
  return (
    <Link
      className={`button ${light ? "button-light" : ""} ${outline ? "button-outline" : ""}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function SectionHeader({ eyebrow, title, description, link }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {link && (
        <Link className="text-link" to={link.to}>
          {link.label}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
export function TourCard({ tour }) {
  return (
    <article className="tour-card">
      <Link
        to={`/tours/${tour.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="card-image"
      >
        <Photo name={tour.image} alt={tour.imageAlt} sizes="(max-width: 550px) 100vw, (max-width: 800px) 50vw, 33vw" />
        <span className="category-badge">{tour.category}</span>
        <span className="card-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="card-content">
        <span className="location">
          <MapPin size={13} aria-hidden="true" />
          {tour.location}
        </span>
        <h3>
          <Link to={`/tours/${tour.id}`}>{tour.title}</Link>
        </h3>
        <p>{tour.shortDescription}</p>
        <div className="card-bottom">
          <span>
            <Clock3 size={15} aria-hidden="true" />
            {tour.duration}
          </span>
          <Link
            to={`/tours/${tour.id}`}
            aria-label={`View details: ${tour.title}`}
          >
            View details <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function CTASection() {
  return (
    <section className="cta-section container">
      <div className="cta-decoration" aria-hidden="true">
        ✳
      </div>
      <div>
        <span className="eyebrow">YOUR NEXT GREAT STORY STARTS HERE</span>
        <h2>Ready to experience Jamaica?</h2>
        <p>Let us help you plan a memorable island experience.</p>
      </div>
      <div className="cta-actions">
        <ButtonLink to="/tours" light>
          Browse Tours
        </ButtonLink>
        <ButtonLink to="/contact" outline>
          Contact Us
        </ButtonLink>
      </div>
    </section>
  );
}
export function PageHeader({ eyebrow, title, text }) {
  return (
    <header className="page-header container">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </header>
  );
}
