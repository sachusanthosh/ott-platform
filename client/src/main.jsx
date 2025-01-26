import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { BookmarkProvider } from "./context/BookmarkContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    </BrowserRouter>
  </StrictMode>
);
