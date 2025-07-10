import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialState = {
  badges: [],
};

export type DormungState = { badges: number[] };
interface DormungAction {
  addBadge: (badge: number) => void;
}
type DormungStore = DormungState & DormungAction;

export const useDormungStore = create<DormungStore>()(
  persist(
    (set) => ({
      badges: initialState.badges,
      addBadge: (badge: number) => set((state) => ({ badges: [...state.badges, badge] })),
    }),
    {
      name: 'dormung',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
