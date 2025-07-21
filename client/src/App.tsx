import "./App.css";
import { useState, useEffect } from "react";
import type { Event, EventCategory } from "./types/Event";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import EventDetailsModal from "./components/EventDetailsModal";
import CategoryFilter from "./components/CategoryFilter";
import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_SERVER_URL;

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "All">("All");

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/events`);
        const data: Event[] = await res.json();
        const sorted = data
          .map((event) => ({
            ...event,
            id: (event as any)._id || event.id,
            category: (event as any).category as EventCategory || "Other",
          }))
          .sort((a, b) => {
            const aDate = dayjs(`${a.date} ${a.time}`);
            const bDate = dayjs(`${b.date} ${b.time}`);
            return aDate.isBefore(bDate) ? -1 : aDate.isAfter(bDate) ? 1 : 0;
          });
        setEvents(sorted);
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
      await fetch(`${API_URL}/events/${id}`, {
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
      await fetch(`${API_URL}/events/${id}`, { method: "DELETE" });
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
      const res = await fetch(`${API_URL}/events`, {
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

  // Filter events by selected category
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : selectedCategory === "Archived"
      ? events.filter((e) => e.archived)
      : events.filter((e) => e.category === selectedCategory && !e.archived);

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center py-8 px-2 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(209,213,219,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(209,213,219,0.09) 1px, transparent 1px)",
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

      <main className="w-full max-w-4xl flex flex-col gap-6">
        {/* Add Event and Category Filter Row */}
        <section className="mb-2">
          <div className="flex flex-nowrap items-center justify-between gap-2 min-w-0">
            <EventForm onAdd={handleAddEvent} />
            <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
          </div>
        </section>

        {/* Event List */}
        <section className="grid gap-4">
          {loading ? (
            <div className="text-gray-400 text-center py-8">Loading events...</div>
          ) : (
            <EventList
              events={filteredEvents}
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
