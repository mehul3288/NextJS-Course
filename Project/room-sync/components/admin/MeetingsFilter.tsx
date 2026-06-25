"use client";

import { useState } from "react";

type FilterValues = {
  location: string;
  date: string;
};

type MeetingsFiltersProps = {
  onFilterChange: (filters: FilterValues) => void;
};

export function MeetingsFilters({ onFilterChange }: MeetingsFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({ location: "", date: "" });

  function updateFilters(filter: keyof FilterValues, value: string) {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  }

  function clearFilters() {
    const cleared = { location: "", date: "" };
    setFilters(cleared);
    onFilterChange(cleared);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onFilterChange(filters);
  }

  const hasFilters = !!(filters.location || filters.date);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-low p-md rounded-xl mb-md flex flex-wrap items-end gap-md"
    >
      {/* Location */}
      <div className="flex flex-col gap-xs min-w-[200px]">
        <label className="text-label-sm text-on-surface font-semibold px-xs">
          Location
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
            location_on
          </span>
          <input
            type="text"
            placeholder="Filter by location..."
            value={filters.location}
            onChange={(e) => updateFilters("location", e.target.value)}
            className="w-full pl-8 pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {/* Date */}
      <div className="flex flex-col gap-xs min-w-[180px]">
        <label className="text-label-sm text-on-surface font-semibold px-xs">
          Date
        </label>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => updateFilters("date", e.target.value)}
          className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="flex items-center gap-xs bg-primary hover:bg-primary/90 text-on-primary px-md py-sm rounded-lg transition-all font-label-md text-label-md mb-px shadow-sm active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-[18px]">
          search
        </span>
        Filter
      </button>

      {/* Clear */}
      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-xs text-primary hover:bg-primary/5 px-md py-sm rounded-lg transition-colors font-label-md text-label-md mb-px"
        >
          <span className="material-symbols-outlined text-[18px]">
            filter_list_off
          </span>
          Clear Filters
        </button>
      )}
    </form>
  );
}