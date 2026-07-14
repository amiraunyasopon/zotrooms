"use client";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const LOCATION_OPTIONS = [
  { key: 'ScienceLibrary', label: 'Science Library' },
  { key: 'LangsonLibrary', label: 'Langson Library' },
  { key: 'GatewayStudyCenter', label: 'Gateway Study Center' },
  { key: 'MultimediaResourcesCenter', label: 'Multimedia Resources Center' },
  { key: 'GrunigenMedicalLibrary', label: 'Grunigen Medical Library' },
];

const calendarSx = {
  width: '100%',
  '& .MuiPickersCalendarHeader-root': {
    color: 'rgba(248, 250, 252, 0.96)',
  },
  '& .MuiPickersCalendarHeader-label': {
    color: 'rgba(248, 250, 252, 0.96)',
    fontWeight: 700,
  },
  '& .MuiPickersArrowSwitcher-button': {
    color: 'rgba(248, 250, 252, 0.9)',
  },
  '& .MuiDayCalendar-weekDayLabel': {
    color: 'rgba(226, 232, 240, 0.65)',
  },
  '& .MuiPickersDay-root': {
    color: 'rgba(248, 250, 252, 0.88)',
    borderRadius: '999px',
  },
  '& .MuiPickersDay-root:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  '& .MuiPickersDay-root.Mui-selected': {
    backgroundImage: 'linear-gradient(135deg, #f59e0b, #fb7185)',
    color: '#fff',
  },
  '& .MuiPickersDay-root.Mui-selected:hover': {
    backgroundImage: 'linear-gradient(135deg, #d97706, #f43f5e)',
  },
  '& .MuiPickersDay-today': {
    borderColor: 'rgba(251, 191, 36, 0.75)',
  },
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    borderRadius: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.16)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.32)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#f59e0b',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(226, 232, 240, 0.75)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#fbbf24',
  },
  input: {
    colorScheme: 'dark',
  },
};

export default function Navbar({
  day,
  startTime,
  endTime,
  buildings,
  onDayChange,
  onStartTimeChange,
  onEndTimeChange,
  onLocationChange,
}) {
  return (
    <aside className="relative flex w-full min-h-0 flex-col gap-6 overflow-y-auto border-b border-white/10 bg-[#07111f] px-5 py-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.38)] lg:sticky lg:top-0 lg:h-full lg:max-h-full lg:w-[28rem] lg:border-b-0 lg:border-r lg:px-6">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.26),_transparent_68%)]" />

      <div className="relative">
        <h1 className="text-2xl font-semibold tracking-tight text-white">ZotRooms</h1>
      </div>

      <section className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Calendar</p>
          <h2 className="mt-1 text-lg font-semibold">Pick a date</h2>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={dayjs(day)}
            onChange={(newDay) => onDayChange(newDay ? newDay.format('YYYY-MM-DD') : day)}
            sx={calendarSx}
          />
        </LocalizationProvider>
      </section>

      <section className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Time</p>
          <h2 className="mt-1 text-lg font-semibold">Set a time window</h2>
        </div>

        <div className="grid gap-3">
          <TextField
            label="Start time"
            type="time"
            value={startTime}
            onChange={(event) => onStartTimeChange(event.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
            sx={fieldSx}
          />
          <TextField
            label="End time"
            type="time"
            value={endTime}
            onChange={(event) => onEndTimeChange(event.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
            sx={fieldSx}
          />
        </div>
      </section>

      <section className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Locations</p>
          <h2 className="mt-1 text-lg font-semibold">Choose locations</h2>
        </div>

        <FormGroup className="space-y-1">
          {LOCATION_OPTIONS.map(({ key, label }) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={Boolean(buildings[key])}
                  onChange={(event) => onLocationChange(event, key)}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.45)',
                    '&.Mui-checked': {
                      color: '#f59e0b',
                    },
                  }}
                />
              }
              label={label}
              className="rounded-2xl border border-transparent px-2 py-1 text-sm text-slate-100 transition hover:border-white/10 hover:bg-white/5"
            />
          ))}
        </FormGroup>
      </section>
    </aside>
  );
}
