import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import { AuthContextProvider } from "../src/context/AuthContext.jsx";
import { BookingContextProvider } from "./context/BookingContext.jsx";
import { ReserveContextProvider } from "./context/ReserveContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <BookingContextProvider>
          <ReserveContextProvider>
            <App />
          </ReserveContextProvider>
        </BookingContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
