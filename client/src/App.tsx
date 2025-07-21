import "./App.css";
import { useState } from "react";
import type { Event } from "./types/Event";
import EventList from "./components/EventList";

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    date: "2024-06-10",
    time: "10:00",
    notes: "Discuss project milestones.",
    category: "Work",
    archived: false,
  },
  {
    id: "2",
    title: "Doctor Appointment",
    date: "2024-06-12",
    time: "15:30",
    notes: "Annual checkup.",
    category: "Health",
    archived: false,
  },
  {
    id: "3",
    title: "Family Dinner",
    date: "2024-06-11",
    time: "19:00",
    notes: "At grandma's house.",
    category: "Personal",
    archived: false,
  },
];

function App() {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const handleArchive = (id: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, archived: true } : event
      )
    );
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
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
          <div className="text-white">[EventForm goes here]</div>
        </section>

        {/* Category Filter */}
        <section className="mb-2">
          <div className="flex justify-end">
            <div className="text-white">[CategoryFilter goes here]</div>
          </div>
        </section>

        {/* Event List */}
        <section className="grid gap-4">
          <EventList events={events} onArchive={handleArchive} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}

export default App;
