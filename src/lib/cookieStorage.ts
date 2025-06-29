import Cookies from "js-cookie";
import type { PersistStorage, StorageValue } from "zustand/middleware";

// Generic cookie storage adapter for Zustand
export const cookieStorage = <T>(): PersistStorage<T> => ({
  getItem: (name) => {
    const value = Cookies.get(name);
    if (!value) return null;
    try {
      return JSON.parse(value) as StorageValue<T>;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    Cookies.set(name, JSON.stringify(value), {
      expires: 365,
      path: "/",
    });
  },
  removeItem: (name) => {
    Cookies.remove(name, { path: "/" });
  },
});
