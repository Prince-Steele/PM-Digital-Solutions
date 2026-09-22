import { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { Photo, PageHeader, CTASection } from "../components/UI";
const photos = [
  {
    name: "hero",
    category: "Beaches",
    title: "Meet me by the water",
    alt: "Turquoise water along a palm-lined coastline",
  },
  {
    name: "mountains",
    category: "Mountains",
    title: "Above the everyday",
    alt: "Green mountain ridges disappearing into mist",
  },
  {
    name: "culture",
    category: "Culture",
    title: "A city full of stories",
    alt: "Panoramic view of Kingston and its harbour",
  },
  {
    name: "waterfall",
    category: "Adventure",
    title: "Take the scenic route",
    alt: "Waterfall flowing through tropical greenery",
  },
  {
    name: "food",
    category: "Food",
    title: "Made to be shared",
    alt: "Jamaican ackee breakfast with fried dumplings",
  },
  {
    name: "beach",
    category: "Beaches",
    title: "On island time",
    alt: "Colourful umbrellas and beachgoers in Montego Bay",
  },
  {
    name: "coast",
    category: "Beaches",
    title: "A little further from ordinary",
    alt: "Palm-filled gardens and turquoise water in Ocho Rios",
  },
];
export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  useEffect(() => {
    if (selected) dialog.current.showModal();
  }, [selected]);
  return (
    <>
      <PageHeader
        eyebrow="A LITTLE ISLAND INSPIRATION"
        title="Wish you were here."
        text="Textures, colours, and moments that capture the spirit of an island escape. Photography is illustrative of the demo experience."
      />
      <section className="container gallery-section">
        <div className="filter-bar" role="group" aria-label="Filter gallery">
          {["All", "Beaches", "Mountains", "Culture", "Food", "Adventure"].map(
            (c) => (
              <button
                key={c}
                className={`filter ${category === c ? "active" : ""}`}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <p className="results-count" aria-live="polite">
          {
            photos.filter((p) => category === "All" || category === p.category)
              .length
          }{" "}
          island moments
        </p>
        <div className="gallery-grid">
          {photos
            .filter((p) => category === "All" || category === p.category)
            .map((photo) => (
              <button
                className="gallery-tile"
                key={photo.name}
                onClick={() => setSelected(photo)}
                aria-label={`Enlarge: ${photo.title}`}
              >
                <Photo name={photo.name} alt={photo.alt} />
                <span>
                  <small>{photo.category}</small>
                  <strong>{photo.title}</strong>
                </span>
                <ArrowUpRight size={23} />
              </button>
            ))}
        </div>
      </section>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Enlarged gallery image"
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            dialog.current.querySelector("button").focus();
          }
        }}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <>
            <button
              className="lightbox-close"
              aria-label="Close enlarged image"
              onClick={() => dialog.current.close()}
            >
              <X />
            </button>
            <Photo name={selected.name} alt={selected.alt} priority />
            <p>
              {selected.title} <span>Illustrative demo photography</span>
            </p>
          </>
        )}
      </dialog>
      <CTASection />
    </>
  );
}
