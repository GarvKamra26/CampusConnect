import { useState } from "react";
import "./pages.css";

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Intro to Robotics Workshop",
    description:
      "Hands-on session covering sensors, microcontrollers, and building your first line-following bot.",
    clubId: 1,
    clubName: "Robotics Club",
    eventDate: "2026-09-12T14:00:00",
    location: "Lab Block, Room 204",
  },
  {
    id: 2,
    title: "Open Mic Night",
    description:
      "Share poetry, music, or stand-up. Sign-ups open at the door — all skill levels welcome.",
    clubId: 2,
    clubName: "Literary Society",
    eventDate: "2026-09-15T18:30:00",
    location: "Amphitheatre",
  },
  {
    id: 3,
    title: "Hackathon Kickoff",
    description:
      "48-hour build sprint with mentors, free food, and prizes for the top three teams.",
    clubId: 3,
    clubName: "Code & Coffee",
    eventDate: "2026-09-20T09:00:00",
    location: "CS Department Hall",
  },
  {
    id: 4,
    title: "Campus Photo Walk",
    description:
      "Golden-hour shoot around campus. Bring any camera — phones totally fine.",
    clubId: 4,
    clubName: "Photography Club",
    eventDate: "2026-09-22T17:00:00",
    location: "Main Gate",
  },
  {
    id: 5,
    title: "Tree Plantation Drive",
    description:
      "Volunteer to plant 200 saplings. Gloves and tools provided. Refreshments after.",
    clubId: 6,
    clubName: "Environmental Action",
    eventDate: "2026-10-05T07:00:00",
    location: "North Campus Grounds",
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

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function formatEventDate(iso) {
  const d = new Date(iso);
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day: d.getDate(),
    weekday: d.toLocaleString("en-US", { weekday: "short" }),
    time: d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
}

function Events() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const now = new Date();
  const weekEnd = new Date(now);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const monthEnd = new Date(now);
  monthEnd.setMonth(monthEnd.getMonth() + 1);

  const filtered = MOCK_EVENTS.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.clubName.toLowerCase().includes(search.toLowerCase());

    const eventDate = new Date(event.eventDate);
    const matchesFilter =
      filter === "all" ||
      (filter === "week" && eventDate >= now && eventDate <= weekEnd) ||
      (filter === "month" && eventDate >= now && eventDate <= monthEnd);

    return matchesSearch && matchesFilter;
  });

  const thisWeek = filtered.filter((e) => {
    const d = new Date(e.eventDate);
    return d >= now && d <= weekEnd;
  });

  const later = filtered.filter((e) => {
    const d = new Date(e.eventDate);
    return d > weekEnd;
  });

  function EventCard({ event }) {
    const { month, day, weekday, time } = formatEventDate(event.eventDate);

    return (
      <article className="event-card">
        <div className="event-date-block">
          <span className="event-date-month">{month}</span>
          <span className="event-date-day">{day}</span>
          <span className="event-date-weekday">{weekday}</span>
        </div>

        <div className="event-content">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <div className="event-tags">
            <span className="event-tag">
              <PinIcon />
              {event.location}
            </span>
            <span className="event-tag">
              <CalendarIcon />
              {time}
            </span>
            <span className="event-tag">{event.clubName}</span>
          </div>
        </div>

        <div className="event-actions">
          <button type="button" className="btn btn-primary">
            RSVP
          </button>
          <button type="button" className="btn btn-ghost">
            Details
          </button>
        </div>
      </article>
    );
  }

  return (
    <div className="page page-events">
      <header className="page-header">
        <div className="page-header-inner">
          <span className="page-eyebrow">Campus Connect</span>
          <h1 className="page-title">Events</h1>
          <p className="page-subtitle">
            Browse upcoming workshops, fests, and club gatherings happening on campus.
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
              placeholder="Search events, locations, clubs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-pills">
            {[
              { key: "all", label: "All" },
              { key: "week", label: "This Week" },
              { key: "month", label: "This Month" },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`filter-pill${filter === key ? " is-active" : ""}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <CalendarIcon />
            <h3>No events found</h3>
            <p>Try adjusting your search or date filter.</p>
          </div>
        ) : (
          <div className="events-list">
            {thisWeek.length > 0 && (
              <>
                <h2 className="events-section-label">This Week</h2>
                {thisWeek.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </>
            )}

            {later.length > 0 && (
              <>
                <h2 className="events-section-label">Coming Up</h2>
                {later.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </>
            )}

            {thisWeek.length === 0 && later.length === 0 && (
              <>
                {filtered.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Events;
