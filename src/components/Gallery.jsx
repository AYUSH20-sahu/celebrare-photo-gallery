import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  initFavourites,
  ActionTypes,
  STORAGE_KEY,
} from '../reducers/favouritesReducer';
import { PhotoCard } from './PhotoCard';
import { SearchBar } from './SearchBar';

export function Gallery() {
  // 1. Data fetching via custom hook
  const { photos, loading, error, refetch } = useFetchPhotos();

  // 2. Favourites state managed strictly via useReducer with lazy initialization
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, initFavourites);

  // 3. Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // 4. Synchronize favourites with localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to sync favourites to localStorage:', err);
    }
  }, [favourites]);

  // 5. Memoized search input handler (Requirement: useCallback)
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // 6. Memoized filtered photo computation (Requirement: useMemo)
  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return photos;

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchTerm]);

  // Favourite toggle handler
  const handleToggleFavourite = useCallback((photo) => {
    dispatch({ type: ActionTypes.TOGGLE_FAVOURITE, photo });
  }, []);

  // Quick lookup set for favourites for O(1) card checking
  const favouriteIds = useMemo(() => {
    return new Set(favourites.map((fav) => fav.id));
  }, [favourites]);

  return (
    <section className="space-y-8" aria-label="Photo Gallery Section">
      {/* Controls Bar: Search & Status Summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:flex-1">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>

        {/* Live count / Favourites info */}
        {!loading && !error && photos.length > 0 && (
          <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-stone-500 shrink-0">
            <span className="bg-white border border-stone-200 px-3 py-1.5 rounded-full shadow-2xs">
              {filteredPhotos.length === photos.length
                ? `${photos.length} photos`
                : `${filteredPhotos.length} of ${photos.length} photos`}
            </span>

            {favourites.length > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200/80 px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5 fill-current text-rose-500" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {favourites.length} {favourites.length === 1 ? 'saved' : 'saved'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* State: Loading */}
      {loading && (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 py-6 text-stone-500">
            <svg
              className="w-5 h-5 animate-spin text-stone-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm font-medium">Fetching 30 curated photos...</span>
          </div>

          {/* Skeleton placeholder grid matching 4 / 2 / 1 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-xs animate-pulse"
              >
                <div className="aspect-[4/3] bg-stone-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-16 bg-stone-200 rounded" />
                  <div className="h-4 w-32 bg-stone-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State: Error with Retry */}
      {!loading && error && (
        <div
          role="alert"
          className="max-w-md mx-auto my-12 bg-white border border-rose-200 rounded-2xl p-6 text-center shadow-sm space-y-4"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-stone-900">Unable to load gallery</h3>
            <p className="text-sm text-stone-500 mt-1">{error}</p>
          </div>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      )}

      {/* State: Empty Search Results */}
      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200/70 max-w-lg mx-auto shadow-xs">
          <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-stone-800">No matching photographers</h3>
          <p className="text-sm text-stone-500 mt-1 max-w-xs mx-auto">
            We couldn't find any photos by <span className="font-semibold text-stone-700">"{searchTerm}"</span>.
          </p>
          <button
            type="button"
            onClick={() => handleSearchChange('')}
            className="mt-4 inline-flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* State: Populated Gallery Grid */}
      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favouriteIds.has(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
