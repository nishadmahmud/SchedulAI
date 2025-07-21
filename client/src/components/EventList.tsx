import React from "react";
import type { Event } from "../types/Event";
import EventCard from "./EventCard";

interface EventListProps {
  events: Event[];
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onArchive,
  onDelete,
}) => {
  if (events.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">No events found.</div>
    );
  }
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EventList;
