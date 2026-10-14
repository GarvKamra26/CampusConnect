import { Link } from "react-router-dom";
import "./pages.css";

const campusSpaces = [
  {
    icon: "✦",
    label: "Find your people",
    title: "Clubs & communities",
    description:
      "From robotics to the literary society, find a community that feels like yours.",
    link: "/clubs",
    action: "Explore clubs",
  },
  {
    icon: "◷",
    label: "Make a plan",
    title: "Events worth showing up for",
    description:
      "Discover workshops, open mics, and campus moments you won't want to miss.",
    link: "/events",
    action: "Browse events",
  },
  {
    icon: "⌁",
    label: "Stay in the loop",
    title: "Conversations that connect",
    description:
      "Catch up with your floor, meet classmates, and make everyday campus life easier.",
    link: "/chatrooms",
    action: "Open chatrooms",
  },
];

function Home() {
  return (
    <div className="page page-home">
      <main>
        <section className="home-hero">
          <div className="home-hero-copy">
            <span className="home-eyebrow">
              <span className="home-eyebrow-dot" aria-hidden="true" />
              Your campus, more connected
            </span>
            <h1>
              Campus life is better
              <br />
              <span>when you&apos;re in it.</span>
            </h1>
            <p>
              Find your people, discover what&apos;s happening, and feel at home
              on campus — all in one place.
            </p>
            <div className="home-hero-actions">
              <Link className="btn btn-primary home-primary-cta" to="/signup">
                Find your community <span aria-hidden="true">↗</span>
              </Link>
              <Link className="home-secondary-cta" to="/events">
                See what&apos;s happening <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="home-social-proof">
              <div className="home-avatar-stack" aria-hidden="true">
                <span>R</span>
                <span>A</span>
                <span>M</span>
                <span>+</span>
              </div>
              <p>
                <strong>Your next campus story</strong>
                <span>starts with a connection.</span>
              </p>
            </div>
          </div>

          <div className="home-hero-art" aria-label="A preview of your campus community">
            <div className="home-orbit home-orbit-outer" />
            <div className="home-orbit home-orbit-inner" />
            <div className="home-glow" />
            <div className="home-preview-card">
              <div className="home-preview-top">
                <div>
                  <span className="home-preview-label">YOUR CAMPUS</span>
                  <h2>A little more connected.</h2>
                </div>
                <span className="home-live-indicator">
                  <span /> LIVE
                </span>
              </div>
              <div className="home-preview-highlight">
                <div className="home-highlight-icon" aria-hidden="true">✦</div>
                <div>
                  <span>YOUR NEXT FAVORITE THING</span>
                  <strong>is happening here.</strong>
                </div>
                <span className="home-highlight-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="home-preview-footer">
                <span className="home-mini-avatars" aria-hidden="true">
                  <i>R</i><i>A</i><i>S</i>
                </span>
                <span>Good things happen together</span>
              </div>
            </div>
            <div className="home-float-card home-float-club">
              <span className="home-float-icon" aria-hidden="true">✳</span>
              <span><strong>Find your people</strong><small>Discover campus clubs</small></span>
            </div>
            <div className="home-float-card home-float-event">
              <span className="home-float-icon" aria-hidden="true">◷</span>
              <span><strong>Make a plan</strong><small>See what&apos;s coming up</small></span>
            </div>
            <span className="home-art-star home-art-star-one" aria-hidden="true">✳</span>
            <span className="home-art-star home-art-star-two" aria-hidden="true">✦</span>
          </div>
        </section>

        <section className="home-spaces" aria-labelledby="home-spaces-title">
          <div className="home-section-heading">
            <div>
              <span className="home-section-kicker">MAKE CAMPUS YOURS</span>
              <h2 id="home-spaces-title">There&apos;s a place for you here.</h2>
            </div>
            <p>
              Your campus is full of possibilities. Start with what you love
              and see where it takes you.
            </p>
          </div>

          <div className="home-space-grid">
            {campusSpaces.map((space, index) => (
              <article className="home-space-card" key={space.title}>
                <div className={`home-space-icon home-space-icon-${index + 1}`} aria-hidden="true">
                  {space.icon}
                </div>
                <span className="home-space-label">{space.label}</span>
                <h3>{space.title}</h3>
                <p>{space.description}</p>
                <Link to={space.link}>
                  {space.action} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="home-bottom-cta">
          <div>
            <span className="home-section-kicker">YOUR CAMPUS IS WAITING</span>
            <h2>Make today a little more connected.</h2>
            <p>Join your campus community and find your next favorite thing.</p>
          </div>
          <Link className="btn btn-primary home-primary-cta" to="/signup">
            Get started <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

    </div>
  );
}

export default Home;
