<<<<<<< HEAD
import { useState, useEffect } from "react";
import "./App.css";

interface Event {
  id: number;
  title: string;
  description: string;
  severity: string;
  date: string;
  regions: string[];
}

interface ImpactData {
  severity: number;
  timeframe: string;
  example: string;
  impact_description: string;
}

interface ImpactResponse {
  event: string;
  location: string;
  impacts: Record<string, ImpactData>;
  overall_severity: number;
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [impacts, setImpacts] = useState<ImpactResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("India");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((r) => r.json())
      .then(setEvents)
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleAnalyzeEvent = async (event: Event) => {
    setSelectedEvent(event);
    setLoading(true);
    setImpacts(null);

    try {
      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: `${event.title}: ${event.description}`,
          location,
        }),
      });

      if (!res.ok) throw new Error("Analysis failed");
      const data: ImpactResponse = await res.json();
      setImpacts(data);
    } catch (e) {
      console.error(e);
      alert("Failed to analyze event. Check backend & API key.");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 7) return "#ff4444";
    if (severity >= 4) return "#ff9900";
    return "#44aa44";
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ GeoPulse</h1>
        <p>Real-time Geopolitical Impact Tracker</p>
      </header>

      <div className="container">
        <div className="left-panel">
          <div className="location-selector">
            <label>📍 Select Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter country or region"
            />
          </div>

          <h2>🌍 Recent Events</h2>
          <div className="events-list">
            {events.map((event) => (
              <div
                key={event.id}
                className={`event-card ${
                  selectedEvent?.id === event.id ? "active" : ""
                }`}
                onClick={() => handleAnalyzeEvent(event)}
              >
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-meta">
                  <span className={`severity ${event.severity}`}>
                    {event.severity.toUpperCase()}
                  </span>
                  <span className="date">{event.date}</span>
                </div>
                <div className="regions">
                  {event.regions.map((region) => (
                    <span key={region} className="region">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-panel">
          {loading && <div className="loading">Analyzing impact...</div>}

          {impacts && !loading && (
            <div className="impacts-panel">
              <h2>📊 Impact Analysis for {impacts.location}</h2>
              <p className="event-analyzed">{impacts.event}</p>

              <div className="severity-meter">
                <div className="meter-label">Overall Impact Severity</div>
                <div className="meter-bar">
                  <div
                    className="meter-fill"
                    style={{
                      width: `${(impacts.overall_severity / 10) * 100}%`,
                      backgroundColor: getSeverityColor(
                        impacts.overall_severity
                      ),
                    }}
                  />
                </div>
                <div className="meter-value">
                  {impacts.overall_severity.toFixed(1)}/10
                </div>
              </div>

              <div className="impacts-grid">
                {Object.entries(impacts.impacts).map(([category, data]) => (
                  <div
                    key={category}
                    className="impact-card"
                    style={{
                      borderLeftColor: getSeverityColor(data.severity),
                    }}
                  >
                    <h3>{category.toUpperCase()}</h3>
                    <div className="severity-indicator">
                      Severity: <strong>{data.severity}/10</strong>
                    </div>
                    <p>
                      <strong>Timeframe:</strong> {data.timeframe}
                    </p>
                    <p>
                      <strong>Example:</strong> {data.example}
                    </p>
                    <p className="description">{data.impact_description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!impacts && !loading && (
            <div className="empty-state">
              👈 Click on an event to analyze its impact
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
=======
import { API_BASE } from "./config";

// events
useEffect(() => {
  fetch(`${API_BASE}/api/events`)
    .then((r) => r.json())
    .then(setEvents)
    .catch(console.error);
}, []);

// analyze
const res = await fetch(`${API_BASE}/api/analyze`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ event: ..., location }),
});
>>>>>>> 74ba842fb3b852e398aeb19fd19a595633cb201d
