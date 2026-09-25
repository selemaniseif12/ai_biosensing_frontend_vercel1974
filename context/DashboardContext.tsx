import { createContext, useState, ReactNode } from "react";

interface DashboardContextType {
  selectedVirus: any | null;
  setSelectedVirus: React.Dispatch<React.SetStateAction<any | null>>;
  filters: Record<string, any>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVirus, setSelectedVirus] = useState<any | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  return (
    <DashboardContext.Provider
      value={{ selectedVirus, setSelectedVirus, filters, setFilters }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
