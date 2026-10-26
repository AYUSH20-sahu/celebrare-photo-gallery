export const STORAGE_KEY = 'celebrare_favourites_v1';

export const ActionTypes = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
};

// Safe lazy initializer for useReducer
export function initFavourites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Could not read favourites from localStorage, resetting to empty:', error);
    return [];
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_FAVOURITE: {
      const targetPhoto = action.photo;
      if (!targetPhoto || !targetPhoto.id) return state;

      const alreadyExists = state.some((photo) => photo.id === targetPhoto.id);

      if (alreadyExists) {
        return state.filter((photo) => photo.id !== targetPhoto.id);
      }

      // Add to favourites, ensuring no duplicate entries
      return [...state, targetPhoto];
    }

    default:
      return state;
  }
}
