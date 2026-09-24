"use client";

import { createContext, useContext, useState } from "react";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [selectedVirus, setSelectedVirus] = useState(null);
  const [filters, setFilters] = useState({});

  return (
    <DashboardContext.Provider
      value={{ selectedVirus, setSelectedVirus, filters, setFilters }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  return useContext(DashboardContext);
}
