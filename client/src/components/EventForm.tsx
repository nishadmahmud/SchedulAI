import React, { useState } from "react";
import { FiPlus, FiX, FiClock, FiCalendar } from "react-icons/fi";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface EventFormProps {
  onAdd: (data: { title: string; date: string; time: string; notes?: string }) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [showTimeClock, setShowTimeClock] = useState(false);
  const [showDateCalendar, setShowDateCalendar] = useState(false);
  const [tempTime, setTempTime] = useState<Dayjs | null>(null);
  const [ampm, setAmPm] = useState<'AM' | 'PM'>('AM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!date) {
      setError("Date is required");
      return;
    }
    if (!time) {
      setError("Time is required");
      return;
    }
    setError("");
    onAdd({
      title: title.trim(),
      date: date.format("YYYY-MM-DD"),
      time: time.format("hh:mm A"),
      notes: notes.trim() || undefined,
    });
    setTitle("");
    setDate(null);
    setTime(null);
    setNotes("");
    setOpen(false);
    setShowTimeClock(false);
    setShowDateCalendar(false);
    setAmPm('AM');
  };

  const handleOpenTimeClock = () => {
    setTempTime(time || dayjs().hour(12).minute(0));
    setAmPm((time || dayjs()).format('A') as 'AM' | 'PM');
    setShowTimeClock(true);
  };

  const handleSetTime = () => {
    let selected = tempTime;
    if (selected) {
      let hour = selected.hour();
      if (ampm === 'AM' && hour >= 12) hour -= 12;
      if (ampm === 'PM' && hour < 12) hour += 12;
      selected = selected.hour(hour);
    }
    setTime(selected);
    setShowTimeClock(false);
  };

  const handleOpenDateCalendar = () => {
    setShowDateCalendar(true);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate);
    setShowDateCalendar(false);
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded px-4 py-2 shadow transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
        onClick={() => setOpen(true)}
      >
        <FiPlus className="text-lg text-white" />
        Add Event
      </button>
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn border border-gray-700">
            <button
              type="button"
              className="absolute top-4 right-4 text-white hover:text-cyan-200 text-2xl focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <FiX />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FiPlus className="text-white" /> Add Event
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="bg-gray-800 text-white rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
                type="text"
                placeholder="Title*"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-gray-800 text-white rounded px-3 py-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 border border-gray-700 hover:bg-gray-700 transition"
                      onClick={handleOpenDateCalendar}
                    >
                      <FiCalendar className="text-lg mr-2 text-white" />
                      {date ? date.format("YYYY-MM-DD") : "Date*"}
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-gray-800 text-white rounded px-3 py-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 border border-gray-700 hover:bg-gray-700 transition"
                      onClick={handleOpenTimeClock}
                    >
                      <FiClock className="text-lg mr-2 text-white" />
                      {time ? time.format("hh:mm A") : "Time*"}
                    </button>
                  </div>
                </div>
                {showDateCalendar && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700 flex flex-col items-center" style={{ width: 420, maxWidth: '98vw' }}>
                      <DateCalendar
                        value={date}
                        onChange={handleDateChange}
                        sx={{
                          color: "#fff",
                          background: "#1f2937",
                          borderRadius: 2,
                          '.MuiPickersDay-root': {
                            color: '#fff',
                          },
                          '.MuiPickersDay-root.Mui-selected': {
                            backgroundColor: '#06b6d4',
                            color: '#fff',
                          },
                          '.MuiPickersDay-root:not(.Mui-selected):hover': {
                            backgroundColor: '#334155',
                          },
                          '.MuiPickersCalendarHeader-label': {
                            color: '#fff',
                          },
                          '.MuiPickersArrowSwitcher-button': {
                            color: '#fff',
                          },
                        }}
                      />
                      <button
                        type="button"
                        className="mt-2 text-xs text-gray-400 hover:underline"
                        onClick={() => setShowDateCalendar(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {showTimeClock && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700 flex flex-col items-center" style={{ width: 340, maxWidth: '90vw' }}>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <button
                          type="button"
                          className={`px-4 py-1 rounded font-semibold text-sm transition border ${ampm === 'AM' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-gray-800 text-gray-300 border-gray-600'}`}
                          onClick={() => setAmPm('AM')}
                        >
                          AM
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-1 rounded font-semibold text-sm transition border ${ampm === 'PM' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-gray-800 text-gray-300 border-gray-600'}`}
                          onClick={() => setAmPm('PM')}
                        >
                          PM
                        </button>
                      </div>
                      <TimeClock
                        value={tempTime}
                        onChange={setTempTime}
                        ampm={true}
                        minutesStep={1}
                        sx={{
                          color: "#fff",
                          background: "#1f2937",
                          borderRadius: 2,
                          '.MuiClockNumber-root': {
                            color: '#fff',
                          },
                          '.MuiClockNumber-root.Mui-selected': {
                            backgroundColor: '#06b6d4',
                            color: '#fff',
                          },
                          '.MuiClockNumber-root:not(.Mui-selected):hover': {
                            backgroundColor: '#334155',
                          },
                          '.MuiClock-amButton, .MuiClock-pmButton': {
                            color: '#fff',
                          },
                        }}
                      />
                      <button
                        type="button"
                        className="mt-4 text-sm text-cyan-400 hover:underline"
                        onClick={handleSetTime}
                      >
                        Set Time
                      </button>
                      <button
                        type="button"
                        className="mt-2 text-xs text-gray-400 hover:underline"
                        onClick={() => setShowTimeClock(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </LocalizationProvider>
              <textarea
                className="bg-gray-800 text-white rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
                placeholder="Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded px-4 py-2 mt-2 transition shadow"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EventForm;
