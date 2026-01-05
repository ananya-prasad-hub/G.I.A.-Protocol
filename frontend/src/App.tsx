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
