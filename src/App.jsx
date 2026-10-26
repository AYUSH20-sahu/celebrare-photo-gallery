import React from 'react';
import { Gallery } from './components/Gallery';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-rose-100 selection:text-rose-900">
      {/* Top Header */}
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
                  Photo Gallery
                </h1>
              </div>
              <p className="mt-1 text-sm text-stone-500 max-w-xl">
                Explore a curated collection of photography from independent creators worldwide.
              </p>
            </div>

            {/* Subtle branding / assignment indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-stone-400 bg-stone-100/80 px-3 py-1.5 rounded-full border border-stone-200/60">
              <span>Celebrare Showcase</span>
              <span>•</span>
              <span>Picsum API</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Gallery />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-stone-200/80 bg-white text-stone-400 py-6 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Celebrare Frontend Assignment • Built with React & Tailwind CSS</p>
          <p className="font-mono text-stone-400">React 18 • Vite • useReducer • Picsum v2</p>
        </div>
      </footer>
    </div>
  );
}
