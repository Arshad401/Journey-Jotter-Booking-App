import { createContext, useState } from "react";


export const ReserveContext = createContext();

export const ReserveContextProvider = ({ children }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);

    return (
      <ReserveContext.Provider
        value={{
            selectedRooms,
            setSelectedRooms
        }}
      >
        {children}
      </ReserveContext.Provider>
    );
  };
  