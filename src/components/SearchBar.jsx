import React from 'react';

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <label htmlFor="author-search" className="sr-only">
        Search photos by author name
      </label>

      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        id="author-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filter by photographer or author name..."
        autoComplete="off"
        className="w-full pl-11 pr-10 py-3 text-sm md:text-base bg-white border border-stone-200 rounded-full shadow-sm placeholder-stone-400 text-stone-900 transition-all duration-200 focus:outline-none focus:border-stone-400 focus:ring-4 focus:ring-stone-200/50"
      />

      {/* Clear Button (visible when search has query) */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search input"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
        >
          <svg
            className="w-4 h-4 bg-stone-100 hover:bg-stone-200 rounded-full p-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
