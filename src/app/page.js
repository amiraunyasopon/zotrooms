'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Navbar from '../Components/navbar';
import { fetchRooms } from './api/user-api';

const LOCATIONS = [
  { key: 'ScienceLibrary', label: 'Science Library', eyebrow: 'Science' },
  { key: 'LangsonLibrary', label: 'Langson Library', eyebrow: 'Langson' },
  { key: 'GatewayStudyCenter', label: 'Gateway Study Center', eyebrow: 'Gateway' },
  { key: 'MultimediaResourcesCenter', label: 'Multimedia Resources Center', eyebrow: 'Multimedia' },
  { key: 'GrunigenMedicalLibrary', label: 'Grunigen Medical Library', eyebrow: 'Grunigen' },
];

const DEFAULT_BUILDINGS = Object.fromEntries(LOCATIONS.map(({ key }) => [key, true]));

function compareTime(timeOne, timeTwo) {
  const timeToDate = (time) => {
    if (!time) {
      return null;
    }

    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds || 0, 0);
    return date;
  };

  const dateOne = timeToDate(timeOne);
  const dateTwo = timeToDate(timeTwo);

  if (!dateOne || !dateTwo) {
    return false;
  }

  return dateOne >= dateTwo;
}

function slotMatches(room, day, startTime, endTime) {
  return (room?.slots ?? []).some((slot) => {
    const slotStart = slot.start?.split('T')?.[1]?.split('+')?.[0];
    const slotEnd = slot.end?.split('T')?.[1]?.split('+')?.[0];
    const slotDay = slot.start?.split('T')?.[0];
    const timeMatch = startTime && endTime ? compareTime(slotStart, startTime) && compareTime(endTime, slotEnd) : true;

    return slotDay === day && slot.isAvailable && timeMatch;
  });
}

function formatRoomName(roomName) {
  if (!roomName) {
    return 'Study room';
  }

  return roomName.length > 54 ? `${roomName.slice(0, 51)}...` : roomName;
}

function RoomCard({ room, day, startTime, endTime }) {
  const visibleSlots = (room?.slots ?? []).filter((slot) => {
    const slotStart = slot.start?.split('T')?.[1]?.split('+')?.[0];
    const slotEnd = slot.end?.split('T')?.[1]?.split('+')?.[0];
    const slotDay = slot.start?.split('T')?.[0];
    const timeMatch = startTime && endTime ? compareTime(slotStart, startTime) && compareTime(endTime, slotEnd) : true;

    return slotDay === day && slot.isAvailable && timeMatch;
  }).length;

  return (
    <article className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mb-3 h-2.5 w-20 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />
            <h4 className="text-lg font-semibold leading-6 text-slate-950">{formatRoomName(room.name)}</h4>
          </div>
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">
            Live
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {visibleSlots} matching slot{visibleSlots === 1 ? '' : 's'} for the selected filters.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Open room</div>
        <a
          href={room.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
        >
          View details
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function LocationSection({ location, rooms }) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-500/90">{location.eyebrow}</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{location.label}</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {rooms.length} room{rooms.length === 1 ? '' : 's'} available
        </div>
      </div>

      <div className="px-5 py-5">
        {rooms.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} day={room.day} startTime={room.startTime} endTime={room.endTime} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <p className="text-lg font-semibold text-slate-900">No available rooms match these filters.</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Try widening the time window or toggling another location.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function MainPage() {
  const [data, setData] = useState([]);
  const [buildings, setBuildings] = useState(DEFAULT_BUILDINGS);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [day, setDay] = useState(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    const getData = async () => {
      try {
        const json = await fetchRooms();
        setData(json.data);
      } catch (error) {
        console.error('Error fetching room data.', error);
      }
    };

    getData();
  }, []);

  const handleLocationChange = (event, type) => {
    const nextValue = event.target.checked;
    setBuildings((current) => ({
      ...current,
      [type]: nextValue,
    }));
  };

  const selectedLocationCount = LOCATIONS.filter(({ key }) => buildings[key]).length;
  const locationsWithRooms = LOCATIONS.filter(
    ({ key, label }) => buildings[key] && data.some((room) => room.location === label && slotMatches(room, day, startTime, endTime)),
  );

  return (
    <div className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_34%),linear-gradient(180deg,_#07111f_0%,_#0f172a_34%,_#f8fafc_34%,_#e2e8f0_100%)] text-slate-100">
      <div className="mx-auto flex h-full w-full max-w-[1800px] flex-col lg:flex-row lg:overflow-hidden">
        <Navbar
          day={day}
          startTime={startTime}
          endTime={endTime}
          buildings={buildings}
          onDayChange={setDay}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          onLocationChange={handleLocationChange}
        />

        <main className="relative flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
          </div>

          <div className="relative mt-6 space-y-5 pb-10">
            {locationsWithRooms.length ? (
              locationsWithRooms.map((location) => {
                const rooms = data
                  .filter((room) => room.location === location.label && slotMatches(room, day, startTime, endTime))
                  .map((room) => ({
                    ...room,
                    day,
                    startTime,
                    endTime,
                  }));

                return <LocationSection key={location.key} location={location} rooms={rooms} />;
              })
            ) : (
              <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <p className="text-2xl font-semibold text-slate-950">No rooms match the current filters.</p>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  Re-enable a location or loosen the selected time window to bring results back.
                </p>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
