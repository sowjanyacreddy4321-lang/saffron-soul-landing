import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ChefHat,
  Clock3,
  Flower2,
  Heart,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  Phone,
  Utensils,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoPhone, mapsUrl, menuItems, navigation, photos } from "@/data/restaurant";
import { Photo, SectionHeading, Stars, Wordmark } from "./shared";
import { MenuSection, GallerySection, ReviewsSection } from "./interactive";
import { Reservation } from "./reservation";

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    navigation.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button asChild variant="brand" size="lg" className="nav-reserve">
          <a href="#reservation">
            Reserve a Table <ArrowRight />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <Button asChild variant="brand" size="lg">
            <a href="#reservation" onClick={() => setOpen(false)}>
              Reserve a Table <ArrowRight />
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AN EXTRAORDINARY INDIAN DINING EXPERIENCE</p>
            <h1>
              Where Every
              <br />
              Meal Becomes
              <br />a <em>Memory.</em>
            </h1>
            <p className="hero-description">
              Welcome to Saffron & Soul. A taste of tradition, a touch of soul — contemporary Indian
              flavours, thoughtfully crafted for moments that matter.
            </p>
            <div className="hero-actions">
              <Button asChild variant="brand" size="lg">
                <a href="#reservation">
                  Reserve a Table <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#menu">
                  Explore Our Menu <Utensils />
                </a>
              </Button>
            </div>
            <div className="hero-trust">
              <div className="guest-avatars" aria-hidden="true">
                <span>AM</span>
                <span>RK</span>
                <span>PS</span>
              </div>
              <div>
                <div>
                  <Stars />
                  <strong>4.8/5 guest love</strong>
                </div>
                <span>Illustrative rating · Crafted with care, served with soul.</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <Photo
              src={photos.feast}
              alt="A generous Indian thali of colourful curries, fresh flatbread and chutneys"
              fetchPriority="high"
            />
            <div className="hero-image-stamp">
              <Flower2 />
              <span>
                FRESH INGREDIENTS
                <br />
                FULL OF SOUL
              </span>
            </div>
            <div className="hero-image-caption">
              <Utensils />
              <div>
                <strong>A Taste of Tradition.</strong>
                <small>A TOUCH OF SOUL.</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="brand-strip">
        <div className="container brand-strip-inner">
          <span>
            <Leaf /> Fresh, locally inspired ingredients
          </span>
          <i className="strip-dot" />
          <span>
            <ChefHat /> Crafted with care, served with soul
          </span>
          <i className="strip-dot" />
          <span>
            <MapPin /> At home in Bengaluru
          </span>
        </div>
      </div>
    </>
  );
}
function Story() {
  return (
    <section className="section" id="story">
      <div className="container story-grid">
        <div className="story-images">
          <Photo
            className="story-main"
            src={photos.interior}
            alt="A welcoming restaurant dining room with natural light and beautifully set tables"
            loading="lazy"
          />
          <span className="story-since">A WARM WELCOME, ALWAYS</span>
          <Photo
            className="story-detail"
            src={photos.dining}
            alt="Elegant dishes and candlelight at a thoughtfully set dining table"
            loading="lazy"
          />
        </div>
        <div className="story-text">
          <p className="eyebrow">OUR STORY</p>
          <h2>
            Rooted in Tradition.
            <br />
            Made for Today.
          </h2>
          <p>
            Some of our fondest memories begin around a table. A familiar aroma, a recipe passed
            down, the warmth of one more helping. Saffron & Soul brings that feeling to a new kind
            of Indian dining.
          </p>
          <p>
            We take the flavours we grew up loving and give them room to surprise. Seasonal
            ingredients, patient cooking, and thoughtful little touches — all served with the kind
            of hospitality that makes you feel at home.
          </p>
          <p className="story-signature">Good food. Warm hearts. Lasting memories.</p>
          <div className="story-highlights">
            <span>
              <Leaf />
              Fresh Ingredients
            </span>
            <span>
              <ChefHat />
              Thoughtful Craft
            </span>
            <span>
              <Heart />
              Warm Hospitality
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function Specials() {
  const specials = menuItems.filter((item) => item.special);
  return (
    <section className="section specials-section" id="specials">
      <div className="container">
        <div className="specials-heading">
          <div>
            <p className="eyebrow">STRAIGHT FROM THE CHEF’S HEART</p>
            <h2>Our Signatures. Your Favourites.</h2>
          </div>
          <p>
            Three dishes that tell our story. A little tradition, a little imagination, and a whole
            lot of soul.
          </p>
        </div>
        <div className="specials-grid">
          {specials.map((item, i) => (
            <article key={item.id} className="special-item">
              <div className="special-photo">
                <Photo
                  src={item.image}
                  alt={`${item.name}, illustrative signature dish photography`}
                  loading="lazy"
                />
                <span className="special-number">0{i + 1}</span>
              </div>
              <div className="dish-title">
                <h3>{item.name}</h3>
                <span>₹{item.price}</span>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Visit() {
  return (
    <section className="section visit-section" id="contact">
      <div className="container">
        <SectionHeading
          label="COME ON OVER"
          title="A Place at Our Table."
          description="In the heart of Indiranagar, a little escape from the everyday."
        />
        <div className="visit-grid">
          <div className="visit-card">
            <div className="visit-card-heading">
              <Clock3 />
              <h3>Good Times, Every Day.</h3>
            </div>
            <div className="hours-row">
              <span>Monday – Friday</span>
              <strong>12:00 PM – 10:30 PM</strong>
            </div>
            <div className="hours-row">
              <span>Saturday – Sunday</span>
              <strong>11:00 AM – 11:00 PM</strong>
            </div>
            <p className="demo-label">
              Fictional sample opening hours. A little lunch, a long dinner — take your time.
            </p>
          </div>
          <div className="visit-card">
            <div className="visit-card-heading">
              <MapPin />
              <h3>Find a Little Soul.</h3>
            </div>
            <p>
              Indiranagar, Bengaluru
              <br />
              Karnataka, India
            </p>
            <div className="visit-location-actions">
              <Button asChild variant="outline">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  Get Directions <ArrowRight />
                </a>
              </Button>
              <a className="demo-phone" href="tel:+919000000000">
                <Phone size={13} />
                {demoPhone}
              </a>
            </div>
            <p className="demo-label">
              Fictional sample location · Demo phone, not a verified business number.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark footer />
            <p>
              A taste of tradition. A touch of soul.
              <br />
              Contemporary Indian dining, made for moments that matter.
            </p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — demo link to Instagram homepage"
                title="Instagram (demo link)"
              >
                <Instagram />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook — demo link to Facebook homepage"
                title="Facebook (demo link)"
              >
                <span aria-hidden="true">f</span>
              </a>
            </div>
            <p>Social links are illustrative destinations.</p>
          </div>
          <div>
            <h3>EXPLORE</h3>
            <nav className="footer-links" aria-label="Footer navigation">
              {navigation.slice(1).map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
              <a href="#reservation">Reservations</a>
            </nav>
          </div>
          <div>
            <h3>OPENING HOURS</h3>
            <div className="footer-details">
              <p>
                Monday – Friday
                <br />
                12:00 PM – 10:30 PM
              </p>
              <p>
                Saturday – Sunday
                <br />
                11:00 AM – 11:00 PM
              </p>
              <p>Fictional sample hours</p>
            </div>
          </div>
          <div>
            <h3>SAY HELLO</h3>
            <div className="footer-details">
              <p>
                Indiranagar, Bengaluru
                <br />
                Karnataka, India
              </p>
              <p>
                <a href="tel:+919000000000">{demoPhone}</a>
                <br />
                <a href="mailto:hello@saffronandsoul.example">hello@saffronandsoul.example</a>
              </p>
              <p>
                Demo contact details.
                <br />
                Not a real restaurant or monitored inbox.
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Saffron & Soul. Fictional restaurant · Competition frontend
            demo.
          </p>
          <a href="#home">
            Back to top <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
export function RestaurantSite() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Story />
        <MenuSection />
        <Specials />
        <GallerySection />
        <Visit />
        <Reservation />
        <ReviewsSection />
      </main>
      <Footer />
      <div className="mobile-booking">
        <p>
          A table for you.<small>A little tradition. A little soul.</small>
        </p>
        <Button asChild variant="brand">
          <a href="#reservation">
            Reserve a Table <ArrowRight />
          </a>
        </Button>
      </div>
    </>
  );
}
