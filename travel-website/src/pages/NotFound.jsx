import { ButtonLink, PageHeader } from "../components/UI";
export default function NotFound() {
  return (
    <section className="not-found">
      <PageHeader
        eyebrow="A LITTLE OFF THE TRAIL · 404"
        title="Let’s find your way back."
        text="This page isn’t on our itinerary. Your next island adventure is just around the corner."
      />
      <ButtonLink to="/tours">Explore Tours</ButtonLink>
    </section>
  );
}
