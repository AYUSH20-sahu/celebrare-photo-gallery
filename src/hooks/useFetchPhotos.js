import { useState, useEffect, useCallback } from 'react';

const API_ENDPOINT = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPhotos = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINT, { signal });

      if (!response.ok) {
        throw new Error(`Failed to load photos (HTTP ${response.status})`);
      }

      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      // Ignore AbortError when component unmounts or request is intentionally cancelled
      if (err.name !== 'AbortError') {
        setError(err.message || 'Unable to connect to the photo service. Please check your network.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadPhotos(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadPhotos]);

  const refetch = useCallback(() => {
    loadPhotos();
  }, [loadPhotos]);

  return { photos, loading, error, refetch };
}
