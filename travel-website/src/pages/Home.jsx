import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  HeartHandshake,
  ShieldCheck,
  CalendarCheck,
  Mountain,
  Waves,
  Leaf,
  Utensils,
  Palette,
  Route,
  Check,
  Sparkles,
} from "lucide-react";
import {
  Photo,
  TourCard,
  SectionHeader,
  CTASection,
  ButtonLink,
} from "../components/UI";
import { tours } from "../data/tours";

const experiences = [
  ["Adventure", Mountain, "A little wild"],
  ["Culture", Palette, "Full of stories"],
  ["Nature", Leaf, "Closer to the green"],
  ["Food", Utensils, "Follow the flavour"],
  ["Beaches", Waves, "Find your calm"],
  ["Private Tours", Route, "Make it your own"],
];
const features = [
  [
    Compass,
    "Local knowledge",
    "The familiar paths and the little places in between. See the island through local eyes.",
  ],
  [
    HeartHandshake,
    "Personalized experiences",
    "Your pace, your interests, your kind of day. There’s more than one way to explore.",
  ],
  [
    ShieldCheck,
    "Reliable service",
    "Thoughtful planning and clear communication, from your first hello to the journey home.",
  ],
  [
    CalendarCheck,
    "Easy booking",
    "Tell us what you have in mind. We’ll help turn a little inspiration into an island itinerary.",
  ],
];
export default function Home() {
  return (
    <>
      <section className="hero">
        <Photo
          name="hero"
          alt="Turquoise Caribbean water meets a lush palm-lined tropical shore"
          priority
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="hero-kicker">
            <span /> LESS ORDINARY. MORE JAMAICA.
          </span>
          <h1>
            Explore Jamaica.
            <br />
            <em>Your way.</em>
          </h1>
          <p>
            Discover unforgettable experiences, hidden gems,
            <br className="desktop-break" /> local culture, and guided
            adventures across Jamaica.
          </p>
          <div className="hero-actions">
            <ButtonLink to="/tours" light>
              Explore Tours
            </ButtonLink>
            <ButtonLink to="/contact" outline>
              Book an Experience
            </ButtonLink>
          </div>
          <div className="hero-trust">
            <span>
              <Check /> Local guides
            </span>
            <span>
              <Check /> Flexible experiences
            </span>
            <span>
              <Check /> Authentic Jamaica
            </span>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>
            <span className="tiny-cross">✳</span> ONE ISLAND. ENDLESS
            POSSIBILITIES.
          </span>
          <a href="#featured" aria-label="Discover featured tours">
            <ArrowDown size={18} />
          </a>
          <span className="hero-coordinate">18.1096° N &nbsp; 77.2975° W</span>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>TAKE THE SCENIC ROUTE</span>
          <Compass size={39} strokeWidth={1} />
          <span>ISLANDTRAIL · JAMAICA</span>
        </div>
      </section>
      <section className="intro-strip container">
        <span className="intro-mark">
          <Sparkles size={28} strokeWidth={1.4} />
        </span>
        <p>
          A little adventure. A lot of soul.
          <br />
          <strong>This is Jamaica beyond the postcard.</strong>
        </p>
        <span className="intro-side">
          Thoughtfully crafted experiences.
          <br />
          Beautifully unhurried days.
        </span>
      </section>
      <section id="featured" className="section container">
        <SectionHeader
          eyebrow="FIND YOUR NEXT ADVENTURE"
          title="Good days start here."
          description="From mountain mornings to saltwater afternoons. Where will you go?"
          link={{ to: "/tours", label: "Explore all tours" }}
        />
        <div className="tour-grid featured-grid">
          {tours.slice(0, 3).map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>
      <section className="why-section">
        <div className="container">
          <SectionHeader
            eyebrow="THE ISLANDTRAIL WAY"
            title="A local connection. A better journey."
            description="It’s the people, the little details, and the freedom to explore that make a day special."
          />
          <div className="features-grid">
            {features.map(([Icon, title, description]) => (
              <article key={title}>
                <span className="feature-icon">
                  <Icon size={26} strokeWidth={1.5} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeader
          eyebrow="WHAT’S YOUR KIND OF JAMAICA?"
          title="Follow your curiosity."
        />
        <div className="experience-grid">
          {experiences.map(([name, Icon, caption]) => (
            <Link
              key={name}
              to={`/tours?category=${name === "Beaches" ? "Beach" : name === "Private Tours" ? "Private" : name}`}
            >
              <Icon size={29} strokeWidth={1.3} />
              <h3>{name}</h3>
              <span>{caption}</span>
              <ArrowUpRight size={17} className="experience-arrow" />
            </Link>
          ))}
        </div>
      </section>
      <section className="story-section container">
        <div className="story-image">
          <Photo
            name="coast"
            alt="Green coastline and clear blue Caribbean water"
          />
          <span className="image-note">
            A little closer to the real Jamaica.
          </span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">MORE THAN A PLACE ON THE MAP</span>
          <h2>
            Come for the views.
            <br />
            <em>Stay for the feeling.</em>
          </h2>
          <p>
            The smell of jerk on the breeze. A conversation that becomes a
            friendship. A turn in the road that opens up to something
            unforgettable.
          </p>
          <p>
            That’s the Jamaica we imagine sharing with you. Rooted in local
            knowledge, made personal, and always full of heart.
          </p>
          <Link className="text-link" to="/about">
            Get to know IslandTrail <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section testimonials-section container">
        <SectionHeader
          eyebrow="THE MOMENTS THAT STAY WITH YOU"
          title="A taste of the experience."
          description="Illustrative guest stories — all testimonials below are fictional demo content."
        />
        <div className="testimonials-grid">
          {[
            [
              "“The best part was how unhurried everything felt. Mountain air, incredible coffee, and time to really take it all in.”",
              "Amelia R.",
              "Blue Mountains Escape",
              "AR",
            ],
            [
              "“From the waterfalls to the little lunch stop, the whole day felt personal. Exactly the Jamaica we wanted to imagine.”",
              "Daniel & Sophie",
              "Ocho Rios Adventure",
              "DS",
            ],
            [
              "“A day full of colour, flavour, and stories. Seeing the island through a local’s eyes makes all the difference.”",
              "Marcus T.",
              "Kingston Culture Experience",
              "MT",
            ],
          ].map(([quote, name, tour, initials]) => (
            <figure key={name}>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>{quote}</blockquote>
              <figcaption>
                <span className="avatar">{initials}</span>
                <span>
                  <strong>{name}</strong>
                  <small>{tour}</small>
                  <small className="demo-label">Fictional demo guest</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
