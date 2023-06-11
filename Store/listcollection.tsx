import create from 'zustand';
import { Postprops } from '@/util/types';

interface State {
  collection: Postprops[] | null;
  setCollection: (data: Postprops[]) => void;
}

export const useAppState = create<State>((set) => ({
  collection: null,
  setCollection: (data: Postprops[]) => set({ collection: data }),
}));