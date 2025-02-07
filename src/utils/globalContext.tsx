import React, { createContext, useState, useContext } from "react";

/**
 * Type definition for the global context
 * @property globals - Object storing all global values
 * @property register - Function to register new global values
 * @property append - Function to append to an existing global array
 */
interface GlobalContextType {
  globals: Record<string, any>;
  register: (key: string, value: any) => void;
  append: (key: string, value: any) => void;
}

/**
 * Context instance for global state management
 */
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

/**
 * Provider component that wraps the app to enable global state
 * @param children - Child components that will have access to the context
 */
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [globals, setGlobals] = useState<Record<string, any>>({});

  /**
   * Registers a new value in the global state
   * @param key - Unique identifier for the value
   * @param value - Value to be stored globally
   */
  const register = (key: string, value: any) => {
    if (globals[key] !== undefined) {
      console.warn(`Global value '${key}' is being overwritten`);
    }
    setGlobals((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Appends a value to an existing array in global state
   * @param key - Key of the array to append to
   * @param value - Value to append
   */
  const append = (key: string, value: any) => {
    setGlobals((prev) => ({ ...prev, [key]: [...prev[key], value] }));
  };

  return (
    <GlobalContext.Provider value={{ globals, register, append }}>
      {children}
    </GlobalContext.Provider>
  );
}

/**
 * Hook to access the global context
 * @throws Error if used outside of GlobalProvider
 * @returns GlobalContextType containing globals and register function
 */
export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
