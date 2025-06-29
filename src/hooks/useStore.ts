import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cookieStorage } from "../lib/cookieStorage";

interface MeRPGState {
  xp: number;
  tasksCompleted: string[];
  stats: Record<string, any> | null;
  setStats: (stats: Record<string, any>) => void;
  increaseXp: (amount: number) => void;
  completeTask: (taskId: string) => void;
  reset: () => void;
}

const useStore = create<MeRPGState>()(
  persist(
    (set) => ({
      xp: 0,
      tasksCompleted: [],
      stats: null,
      setStats: (stats) => set({ stats }),
      increaseXp: (amount) => set((state) => ({ xp: state.xp + amount })),
      completeTask: (taskId) =>
        set((state) => ({
          tasksCompleted: [...state.tasksCompleted, taskId],
        })),
      reset: () => set({ xp: 0, tasksCompleted: [], stats: null }),
    }),
    {
      name: "me-rpg-state",
      storage: cookieStorage<MeRPGState>(),
    }
  )
);

export default useStore;
