import "./App.css";
import { useState, useEffect } from "react";
import type { Event, EventCategory } from "./types/Event";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import EventDetailsModal from "./components/EventDetailsModal";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/events");
        const data: Event[] = await res.json();
        setEvents(
          data.map((event) => ({
            ...event,
            id: (event as any)._id || event.id,
            category: ((event as any).category as EventCategory) || "Other",
          }))
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Archive event
  const handleArchive = async (id: string) => {
    const event = events.find((e) => e.id === id);
    if (!event) return;
    try {
      await fetch(`http://localhost:5000/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...event, archived: true }),
      });
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, archived: true } : e))
      );
    } catch {}
  };

  // Delete event
  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/events/${id}`, { method: "DELETE" });
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch {}
  };

  // Add event
  const handleAddEvent = async (data: {
    title: string;
    date: string;
    time: string;
    notes?: string;
  }) => {
    const newEvent: Omit<Event, "id" | "category"> = {
      ...data,
      archived: false,
    };
    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const insertedEvent = await res.json();
      setEvents((prev) => [
        {
          ...insertedEvent,
          id: insertedEvent._id || insertedEvent.id || Date.now().toString(),
        } as Event,
        ...prev,
      ]);
    } catch {}
  };

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center py-8 px-2 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(209,213,219,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(209,213,219,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
          SchedulAI
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          Organize your events with AI-powered categorization
        </p>
      </header>

      <main className="w-full max-w-3xl flex flex-col gap-6">
        {/* Event Form */}
        <section className="mb-2">
          <EventForm onAdd={handleAddEvent} />
        </section>

        {/* Category Filter */}
        <section className="mb-2">
          <div className="flex justify-end">
            <div className="text-white">[CategoryFilter goes here]</div>
          </div>
        </section>

        {/* Event List */}
        <section className="grid gap-4">
          {loading ? (
            <div className="text-gray-400 text-center py-8">Loading events...</div>
          ) : (
            <EventList
              events={events}
              onArchive={handleArchive}
              onDelete={handleDelete}
              onCardClick={(event) => {
                if (!event.archived) setSelectedEvent(event);
              }}
            />
          )}
        </section>
      </main>
      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default App;
