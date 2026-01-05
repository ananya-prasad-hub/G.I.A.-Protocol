import { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "https://gia-protocol-production.up.railway.app";

interface Event {
  id: number;
  title: string;
  description: string;
  severity: string;
  date: string;
  regions: string[];
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/events`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Events loaded:", data);
        setEvents(Array.isArray(data) ? data : []);
        setLoadingEvents(false);
      })
      .catch(err => {
        console.error("Backend error:", err);
        setError("Backend not responding. Check https://gia-protocol-production.up.railway.app/api/events");
        setLoadingEvents(false);
      });
  }, []);

  const fallbackEvents: Event[] = [
    { id: 1, title: "Middle East Tensions", description: "Gulf region activity", severity: "high", date: "2026-01-05", regions: ["Middle East"] },
    { id: 2, title: "Ukraine Updates", description: "Eastern Europe operations", severity: "high", date: "2026-01-04", regions: ["Europe"] },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ GeoPulse</h1>
        <p>Real-time Geopolitical Impact Tracker</p>
      </header>

      <div className="container">
        <div className="left-panel">
          <h2>🌍 Recent Events</h2>
          
          {error && (
            <div style={{ color: "#ff4444", padding: "1rem", background: "rgba(255,68,68,0.1)" }}>
              ❌ {error}
              <br />
              <small>Backend: <a href={`${API_BASE}/api/events`} target="_blank">Test API</a></small>
            </div>
          )}

          {loadingEvents ? (
            <div className="empty-state">Loading events...</div>
          ) : events.length > 0 ? (
            <div className="events-list">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span className={`severity ${event.severity}`}>{event.severity.toUpperCase()}</span>
                    <span className="date">{event.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="events-list">
              {fallbackEvents.map(event => (
                <div key={event.id} className="event-card">
                  <h3>{event.title} (Demo)</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span className={`severity ${event.severity}`}>{event.severity.toUpperCase()}</span>
                    <span className="date">{event.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="right-panel">
          <div className="empty-state">
            👈 Click events above for AI analysis<br/>
            <small>(Backend must be working)</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
