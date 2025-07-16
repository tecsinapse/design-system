import React, { createContext, useContext, ReactNode } from 'react';

interface CalendarContextProps {
  isTodayHighlited: boolean;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
);

export const CalendarProvider = ({
  isTodayHighlited,
  children,
}: {
  isTodayHighlited: boolean;
  children: ReactNode;
}) => (
  <CalendarContext.Provider value={{ isTodayHighlited }}>
    {children}
  </CalendarContext.Provider>
);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider'
    );
  }
  return context;
};
