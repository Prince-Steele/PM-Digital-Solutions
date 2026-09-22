import { useSearchParams } from "react-router-dom";
import { categories, tours } from "../data/tours";
import { PageHeader, TourCard, CTASection } from "../components/UI";
export default function Tours() {
  const [params, setParams] = useSearchParams();
  const active = categories.includes(params.get("category"))
    ? params.get("category")
    : "All";
  const filtered = tours.filter(
    (t) => active === "All" || t.category === active,
  );
  return (
    <>
      <PageHeader
        eyebrow="A DAY OUT. A STORY TO KEEP."
        title="Explore our tours."
        text="Big adventures, small discoveries, and everything in between. Find your kind of island day."
      />
      <section className="container tours-section">
        <div
          className="filter-bar"
          role="group"
          aria-label="Filter tours by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              className={active === category ? "filter active" : "filter"}
              aria-pressed={active === category}
              onClick={() => setParams(category === "All" ? {} : { category })}
            >
              {category === "Private" ? "Private Tours" : category}
            </button>
          ))}
        </div>
        <p className="results-count" aria-live="polite">
          {filtered.length}{" "}
          {filtered.length === 1 ? "experience" : "experiences"} to make your
          own <span>Sample itineraries · Inquiries only</span>
        </p>
        <div className="tour-grid">
          {filtered.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
