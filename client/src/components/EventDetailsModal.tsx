import React from "react";
import type { Event } from "../types/Event";

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30" onClick={onClose}>
      <div
        className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-white hover:text-cyan-200 text-2xl focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{event.title}</h2>
        <div className="mb-2 flex gap-2 items-center">
          <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
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
          }`}>
            {event.category}
          </span>
          {event.archived && (
            <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-600 text-white ml-2">Archived</span>
          )}
        </div>
        <div className="mb-2 text-gray-300 text-sm flex gap-4">
          <span>{event.date}</span>
          <span>{event.time}</span>
        </div>
        {event.notes && (
          <div className="mb-4 text-gray-400 whitespace-pre-line">{event.notes}</div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsModal; 