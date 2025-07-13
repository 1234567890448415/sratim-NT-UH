const MOVIES_STORAGE_KEY = "ntuh_movies";
const NEW_MOVIES_STORAGE_KEY = "ntuh_new_movies";

export const saveMovies = (movies) => {
  try {
    localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error("שגיאה בשמירת סרטים:", error);
  }
};

export const loadMovies = () => {
  try {
    const movies = localStorage.getItem(MOVIES_STORAGE_KEY);
    return movies ? JSON.parse(movies) : [];
  } catch (error) {
    console.error("שגיאה בטעינת סרטים:", error);
    return [];
  }
};

export const saveNewMovies = (newMovies) => {
  try {
    localStorage.setItem(NEW_MOVIES_STORAGE_KEY, JSON.stringify(newMovies));
  } catch (error) {
    console.error("שגיאה בשמירת סרטים חדשים:", error);
  }
};

export const loadNewMovies = () => {
  try {
    const newMovies = localStorage.getItem(NEW_MOVIES_STORAGE_KEY);
    return newMovies ? JSON.parse(newMovies) : [];
  } catch (error) {
    console.error("שגיאה בטעינת סרטים חדשים:", error);
    return [];
  }
};

export const addMovie = (movie) => {
  const movies = loadMovies();
  const newMovie = {
    ...movie,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  movies.push(newMovie);
  saveMovies(movies);
  return newMovie;
};

export const addToNewMovies = (movieId) => {
  const newMovies = loadNewMovies();
  if (!newMovies.includes(movieId)) {
    newMovies.push(movieId);
    saveNewMovies(newMovies);
  }
};

export const removeFromNewMovies = (movieId) => {
  const newMovies = loadNewMovies();
  const filtered = newMovies.filter(id => id !== movieId);
  saveNewMovies(filtered);
};

export const deleteMovie = (movieId) => {
  const movies = loadMovies();
  const filtered = movies.filter(movie => movie.id !== movieId);
  saveMovies(filtered);
  removeFromNewMovies(movieId);
}; 