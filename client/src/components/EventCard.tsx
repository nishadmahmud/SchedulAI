import React from "react";
import type { Event } from "../types/Event";

interface EventCardProps {
  event: Event;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onArchive,
  onDelete,
}) => {
  return (
    <div
      className={`rounded-lg shadow p-4 bg-gray-800 border ${
        event.archived ? "opacity-60 border-gray-600" : "border-gray-700"
      } transition-all`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2
          className="text-xl font-semibold text-white truncate"
          title={event.title}
        >
          {event.title}
        </h2>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            event.category === "Work"
              ? "bg-blue-700 text-blue-100"
              : event.category === "Personal"
              ? "bg-pink-700 text-pink-100"
              : event.category === "Health"
              ? "bg-green-700 text-green-100"
              : event.category === "Travel"
              ? "bg-amber-600 text-amber-100"
              : event.category === "Finance"
              ? "bg-purple-700 text-purple-100"
              : "bg-gray-700 text-gray-200"
          }`}
        >
          {event.category}
        </span>
      </div>
      <div className="flex items-center gap-4 text-gray-300 text-sm mb-2">
        <span>{event.date}</span>
        <span>{event.time}</span>
      </div>
      {event.notes && (
        <div className="text-gray-400 text-sm mb-3 whitespace-pre-line">
          {event.notes}
        </div>
      )}
      <div className="flex gap-2 mt-2">
        <button
          className={`px-3 py-1 rounded bg-gray-700 text-gray-200 hover:bg-blue-800 hover:text-white transition text-xs ${
            event.archived ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => onArchive(event.id)}
          disabled={event.archived}
        >
          {event.archived ? "Archived" : "Archive"}
        </button>
        <button
          className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-800 transition text-xs"
          onClick={() => onDelete(event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
