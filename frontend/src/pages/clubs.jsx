import { useState } from "react";
import "./pages.css";

const MOCK_CLUBS = [
  {
    id: 1,
    name: "Robotics Club",
    description:
      "Build robots, compete in national hackathons, and learn embedded systems with hands-on workshops every week.",
    logo: "🤖",
    members: 142,
    events: 6,
  },
  {
    id: 2,
    name: "Literary Society",
    description:
      "Poetry nights, open mics, and creative writing circles for students who love words and storytelling.",
    logo: "📚",
    members: 89,
    events: 4,
  },
  {
    id: 3,
    name: "Code & Coffee",
    description:
      "Weekly meetups for developers of all levels. Pair programming, project demos, and career talks.",
    logo: "☕",
    members: 210,
    events: 8,
  },
  {
    id: 4,
    name: "Photography Club",
    description:
      "Campus photo walks, editing workshops, and an annual exhibition showcasing student work.",
    logo: "📷",
    members: 67,
    events: 3,
  },
  {
    id: 5,
    name: "Music Ensemble",
    description:
      "Jam sessions, open auditions, and performances at college fests. All instruments welcome.",
    logo: "🎵",
    members: 54,
    events: 5,
  },
  {
    id: 6,
    name: "Environmental Action",
    description:
      "Tree drives, sustainability campaigns, and campus green initiatives led by student volunteers.",
    logo: "🌱",
    members: 118,
    events: 7,
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  );
}

function Clubs() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_CLUBS.filter(
    (club) =>
      club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page page-clubs">
      <header className="page-header">
        <div className="page-header-inner">
          <span className="page-eyebrow">Campus Connect</span>
          <h1 className="page-title">Clubs</h1>
          <p className="page-subtitle">
            Discover student organizations, find your community, and explore upcoming club events.
          </p>
        </div>
      </header>

      <main className="page-body">
        <div className="page-toolbar">
          <div className="search-wrap">
            <SearchIcon />
            <input
              className="search-input"
              type="search"
              placeholder="Search clubs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary">
            + Create Club
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <SearchIcon />
            <h3>No clubs found</h3>
            <p>Try a different search term or create a new club.</p>
          </div>
        ) : (
          <div className="card-grid">
            {filtered.map((club) => (
              <article key={club.id} className="card club-card">
                <div className="club-card-top">
                  <div className="club-logo" aria-hidden="true">
                    {club.logo}
                  </div>
                  <div>
                    <h2 className="card-title">{club.name}</h2>
                    <div className="club-stats">
                      <span className="club-stat">
                        <strong>{club.members}</strong>
                        members
                      </span>
                      <span className="club-stat">
                        <strong>{club.events}</strong>
                        events
                      </span>
                    </div>
                  </div>
                </div>
                <p className="card-text">{club.description}</p>
                <div className="card-footer">
                  <span className="badge badge-user">Active</span>
                  <button type="button" className="btn btn-ghost">
                    View Club
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Clubs;
