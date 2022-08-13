import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
  loading: new Set(),
  load: null,
  complete: null,
});

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(new Set());

  /**
   * Add a tag to loading set
   * @param {String} tag
   * @returns
   */
  function load(tag) {
    if (loading.has(tag)) {
      return;
    }

    const newSet = new Set(loading);
    newSet.add(tag);
    setLoading(newSet);
    return;
  }

  /**
   * Remove a tag from loading set
   * @param {String} tag
   * @returns
   */
  function complete(tag) {
    if (loading.has(tag)) {
      return;
    }

    const newSet = new Set(loading);
    newSet.delete(tag);
    setLoading(newSet);
    return;
  }

  const value = { loading, load, complete };
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
