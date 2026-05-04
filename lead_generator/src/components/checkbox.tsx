"use client";

import { useEffect, useRef, useState } from "react";

const CITY_OPTIONS = [
  { label: "Mill Valley", value: "MILL VALLEY" },
  { label: "Novato", value: "NOVATO" },
  { label: "San Rafael", value: "SAN RAFAEL" },
  { label: "Fairfield", value: "FAIRFIELD" },
  { label: "Inverness", value: "INVERNESS" },
];

export default function Checkbox() {
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleCity = (value: string) => {
    setCities((prev) =>
      prev.includes(value)
        ? prev.filter((city) => city !== value)
        : [...prev, value]
    );
  };

  const clearCities = () => setCities([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const triggerLabel =
    cities.length === 0
      ? "All cities"
      : cities.length === 1
      ? CITY_OPTIONS.find((city) => city.value === cities[0])?.label ?? "1 city"
      : `${cities.length} cities selected`;

  return (
    <div ref={wrapperRef} className="relative w-full">
      {cities.map((city) => (
        <input key={city} type="hidden" name="cities" value={city} />
      ))}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-medium shadow-sm transition ${
          open
            ? "border-slate-400 bg-white text-slate-900"
            : "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400"
        }`}
      >
        <span className="truncate">{triggerLabel}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-[240px] rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          <div className="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Cities
          </div>

          <div className="max-h-64 overflow-y-auto">
            {CITY_OPTIONS.map((city) => (
              <label
                key={city.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={cities.includes(city.value)}
                  onChange={() => toggleCity(city.value)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
                <span>{city.label}</span>
              </label>
            ))}
          </div>

          <div className="mt-2 border-t border-slate-200 pt-2">
            <button
              type="button"
              onClick={clearCities}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}