import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, Footer } from "./components/Layout";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { tours } from "./data/tours";
export default function App() {
  const { pathname, search } = useLocation();
  const initial = useRef(true);
  useEffect(() => {
    const titles = {
      "/": "Explore Jamaica. Your Way.",
      "/tours": "Explore Our Tours",
      "/about": "Our Story",
      "/gallery": "Island Inspiration",
      "/contact": "Booking Inquiry",
    };
    document.title = `${titles[pathname] || tours.find((t) => pathname === `/tours/${t.id}`)?.title || "Page Not Found"} | IslandTrail Jamaica`;
    window.scrollTo(0, 0);
    if (!initial.current)
      document.querySelector("#main")?.focus({ preventScroll: true });
    initial.current = false;
  }, [pathname]);
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/contact"
            element={<Contact key={search} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
