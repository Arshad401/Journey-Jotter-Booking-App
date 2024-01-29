import React, { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  bookedHotels: JSON.parse(localStorage.getItem("booking")) ,
  bookingLoading: false,
  bookingError: null,
};

export const BookingContext = createContext(INITIAL_STATE);

const BookingReducer = (state, action) => {
  switch (action.type) {
    case "BOOKING_START":
      return {
        ...state,
        bookingLoading: true,
        bookingError: null,
      };
    case "BOOKING_SUCCESS":
      return {
        ...state,
        bookedHotels: action.payload,
        bookingLoading: false,
        bookingError: null,
      };
    case "BOOKING_FAILURE":
      return {
        ...state,
        bookingLoading: false,
        bookingError: action.payload,
      };
    case "CANCEL_BOOKING":
      return {
        ...state,
        bookedHotels: null,
      };
    default:
      return state;
  }
};

export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookingReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("booking", JSON.stringify(state.bookedHotels));
  }, [state.bookedHotels]);

  return (
    <BookingContext.Provider
      value={{
        bookedHotels: state.bookedHotels,
        bookingLoading: state.bookingLoading,
        bookingError: state.bookingError,
        dispatch,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
