import { useState } from "react";
import "./App.css";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [impacts, setImpacts] = useState(null);
  const [loading, setLoading] = useState(false);

  const events = [
    { id: 1, title: "Middle East Tensions", desc: "Gulf military activity", severity: "high" },
    { id: 2, title: "Ukraine Conflict", desc: "Eastern Europe operations", severity: "high" },
    { id: 3, title: "US-China Trade War", desc: "New tariffs announced", severity: "medium" },
  ];

  const handleClick = (event) => {
    console.log("CLICKED:", event.title); // DEBUG - check F12 console
    setSelectedEvent(event);
    setLoading(true);
    setImpacts(null);

    // 2-SECOND FAKE AI LOADING
    setTimeout(() => {
      setImpacts({
        event: event.title,
        location: "India",
        overall: 7.2,
        impacts: {
          energy: { severity: 8, timeframe: "immediate", example: "Petrol +₹5", desc: "Oil spike" },
          food: { severity: 6, timeframe: "2 weeks", example: "Rice +15%", desc: "Supply chain" },
          travel: { severity: 7, timeframe: "immediate", example: "Flights +20%", desc: "Fuel costs" },
          jobs: { severity: 4, timeframe: "1 month", example: "Exports delayed", desc: "Trade risk" },
          currency: { severity: 5, timeframe: "2 weeks", example: "₹83.8/$", desc: "Import pressure" }
        }
      });
      setLoading(false);
    }, 2000);
  };

  const getColor = (severity) => severity >= 7 ? "#ff4444" : severity >= 4 ? "#ff9900" : "#44aa44";

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ GeoPulse</h1>
        <p>Real-time Geopolitical Impact Tracker</p>
      </header>

      <div className="container">
        <div className="left-panel">
          <h2>🌍 Recent Events</h2>
          <div className="events-list">
            {events.map((event) => (
              <div 
                key={event.id}
                className={`event-card ${selectedEvent?.id === event.id ? "active" : ""}`}
                onClick={() => handleClick(event)}
                style={{ cursor: "pointer" }}
              >
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
                <div className="event-meta">
                  <span className={`severity ${event.severity}`}>{event.severity.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-panel">
          {loading && (
            <div className="loading">
              <div>🤖 AI Analyzing...</div>
              <div style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "1rem" }}>
                Powered by Google Gemini
              </div>
            </div>
          )}

          {impacts && !loading && (
            <div className="impacts-panel">
              <h2>📊 Impact Analysis: India</h2>
              <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
                {impacts.event}
              </p>

              <div className="severity-meter">
                <div style={{ fontSize: "0.9rem", color: "#cbd5e1", marginBottom: "0.5rem" }}>
                  Overall Impact Severity
                </div>
                <div style={{ 
                  height: "8px", 
                  background: "rgba(148,163,184,0.2)", 
                  borderRadius: "4px", 
                  overflow: "hidden" 
                }}>
                  <div style={{
                    width: `${(impacts.overall / 10) * 100}%`,
                    height: "100%",
                    backgroundColor: getColor(impacts.overall),
                    transition: "width 1s ease"
                  }} />
                </div>
                <div style={{ 
                  textAlign: "right", 
                  fontWeight: "bold", 
                  color: "#0ea5e9", 
                  marginTop: "0.5rem" 
                }}>
                  {impacts.overall}/10
                </div>
              </div>

              <div className="impacts-grid">
                {Object.entries(impacts.impacts).map(([cat, data]) => (
                  <div key={cat} className="impact-card" style={{ 
                    borderLeft: `4px solid ${getColor(data.severity)}`
                  }}>
                    <h3>{cat.toUpperCase()}</h3>
                    <div style={{ 
                      padding: "0.5rem", 
                      background: "rgba(14,165,233,0.1)", 
                      borderRadius: "4px", 
                      marginBottom: "0.75rem",
                      fontSize: "0.9rem"
                    }}>
                      Severity: <strong>{data.severity}/10</strong>
                    </div>
                    <p><strong>When:</strong> {data.timeframe}</p>
                    <p><strong>Example:</strong> {data.example}</p>
                    <p style={{ fontStyle: "italic", color: "#94a3b8" }}>
                      {data.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!impacts && !loading && (
            <div className="empty-state">
              👈 Click any event above for instant AI analysis
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
