import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Mountain, Menu, X, ArrowUpRight, MapPin } from "lucide-react";

function Instagram() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </svg>
  );
}
function Facebook() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M14 21v-8h3l1-4h-4V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="IslandTrail Jamaica home">
      <span className="logo-icon">
        <Mountain size={30} strokeWidth={1.5} />
      </span>
      <span>
        IslandTrail<span className="logo-sub">J A M A I C A</span>
      </span>
    </Link>
  );
}
const links = [
  ["/", "Home"],
  ["/tours", "Tours"],
  ["/about", "About"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <Logo />
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-controls="main-navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={open ? "nav-links open" : "nav-links"}
          >
            {links.map(([to, label]) => (
              <NavLink key={to} end={to === "/"} to={to}>
                {label}
              </NavLink>
            ))}
            <Link className="button nav-cta" to="/contact">
              Book a Tour <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            For the places you’ll remember.
            <br />
            And the moments you didn’t plan.
          </p>
          <span className="footer-location">
            <MapPin size={15} /> Made of Jamaica.
          </span>
        </div>
        <div>
          <h2>Explore the island</h2>
          {links.slice(1).map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h2>Let’s make a plan</h2>
          <span>hello@islandtrail.example</span>
          <span>WhatsApp: +1 (876) 555-0100</span>
          <small>Illustrative contact details only.</small>
          <div className="social-icons">
            <span
              role="img"
              aria-label="Instagram — concept only"
              title="Instagram — concept only"
            >
              <Instagram size={19} />
            </span>
            <span
              role="img"
              aria-label="Facebook — concept only"
              title="Facebook — concept only"
            >
              <Facebook size={19} />
            </span>
            <small>Social profiles: demo only</small>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} IslandTrail Jamaica · Fictional tour
          company
        </span>
        <span>
          Demo Website Concept by <strong>PMS Digital Solutions</strong>
        </span>
      </div>
    </footer>
  );
}
