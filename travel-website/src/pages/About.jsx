import { Compass, Heart, Handshake, Leaf } from "lucide-react";
import { PageHeader, Photo, CTASection, SectionHeader } from "../components/UI";
export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="ROOTED HERE. READY TO EXPLORE."
        title="Discover Jamaica with people who know it."
        text="An island full of stories. A journey made personal."
      />
      <section className="container about-story">
        <Photo
          name="coast"
          alt="An inviting stretch of tropical coastline"
          priority
        />
        <div>
          <span className="eyebrow">OUR CONCEPT STORY</span>
          <h2>
            Local roots.
            <br />
            Open horizons.
          </h2>
          <p>
            IslandTrail Jamaica is a fictional tour company imagined around a
            simple idea: the best way to discover an island is with people who
            feel at home there.
          </p>
          <p>
            Our concept brings together nature, food, culture, and everyday
            connections. Think scenic detours, time for a conversation, and
            experiences that move at your pace.
          </p>
          <p>
            Created by PMS Digital Solutions, this demo shows how a thoughtful
            website can help a Jamaican tour operator share its story and make
            travel planning feel easy.
          </p>
        </div>
      </section>
      <section className="mission-section">
        <div className="container">
          <span className="eyebrow">THE MISSION WE IMAGINE</span>
          <h2>
            To turn a visit into a connection.
            <br />
            With the island. With its people.
            <br />
            <em>With a different pace of life.</em>
          </h2>
        </div>
      </section>
      <section className="container section">
        <SectionHeader
          eyebrow="WHAT GUIDES THE JOURNEY"
          title="Good experiences begin with good values."
        />
        <div className="features-grid">
          {[
            [
              Leaf,
              "Authenticity",
              "Real curiosity about the island’s places, food, culture, and everyday stories.",
            ],
            [
              Handshake,
              "Reliability",
              "Clear plans, honest expectations, and thoughtful attention to the details.",
            ],
            [
              Heart,
              "Hospitality",
              "A warm welcome and space for every traveller to feel comfortable.",
            ],
            [
              Compass,
              "Local knowledge",
              "Respect for the communities and landscapes that make Jamaica special.",
            ],
          ].map(([Icon, title, text]) => (
            <article key={title}>
              <span className="feature-icon">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
