import React, { createContext, useState, ReactNode, useContext } from "react";

interface WindowContextType {
  openWindows: { id: number; zIndex: number }[];
  setOpenWindows: React.Dispatch<
    React.SetStateAction<{ id: number; zIndex: number }[]>
  >;
  bringToFront: (id: number) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openWindows, setOpenWindows] = useState<
    { id: number; zIndex: number }[]
  >([]);

  const bringToFront = (id: number) => {
    setOpenWindows((prevWindows) => {
      const updatedWindows = prevWindows.filter((win) => win.id !== id);
      const zIndex = updatedWindows.length
        ? Math.max(...updatedWindows.map((win) => win.zIndex)) + 1
        : 1;
      return [...updatedWindows, { id, zIndex }];
    });
  };

  return (
    <WindowContext.Provider
      value={{ openWindows, setOpenWindows, bringToFront }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowContext must be used within a WindowProvider");
  }
  return context;
};
