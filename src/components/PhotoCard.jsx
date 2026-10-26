import React, { useState } from 'react';

export function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Picsum provides full-res in download_url, but requests for thumbnail size (600x450) load much faster
  const optimizedImageUrl = `https://picsum.photos/id/${photo.id}/600/450`;

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Photo Container */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {/* Shimmer Placeholder while image loads */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 animate-pulse" />
        )}

        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-stone-400 text-xs text-center bg-stone-50">
            <svg className="w-8 h-8 mb-1 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            src={optimizedImageUrl}
            alt={`Captured by ${photo.author}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              // If the resized endpoint fails, fallback to raw download_url
              if (e.target.src !== photo.download_url) {
                e.target.src = photo.download_url;
              } else {
                setImageError(true);
              }
            }}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Floating Heart Button */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo)}
          aria-label={
            isFavourite
              ? `Remove photo by ${photo.author} from favourites`
              : `Add photo by ${photo.author} to favourites`
          }
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 active:scale-90 ${
            isFavourite
              ? 'bg-white/95 text-rose-500 shadow-md animate-heartPop'
              : 'bg-black/30 hover:bg-black/45 text-white shadow-sm'
          }`}
        >
          <svg
            className="w-5 h-5 transition-transform duration-200"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavourite ? '1.5' : '2'}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>

      {/* Card Details */}
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider font-semibold text-stone-400">
            Photographer
          </p>
          <h3
            title={photo.author}
            className="text-sm font-semibold text-stone-800 truncate group-hover:text-stone-950 transition-colors"
          >
            {photo.author}
          </h3>
        </div>

        {/* Photo ID Badge */}
        <span className="shrink-0 text-[11px] font-mono font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
          #{photo.id}
        </span>
      </div>
    </article>
  );
}
