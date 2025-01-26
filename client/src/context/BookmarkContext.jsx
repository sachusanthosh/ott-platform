import { createContext, useContext, useState } from "react";

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  const addBookmark = (movie) => {
    setBookmarkedMovies((prev) => [...prev, movie]);
  };

  const removeBookmark = (movie) => {
    setBookmarkedMovies((prev) =>
      prev.filter((m) => m.title !== movie.title)
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedMovies, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};