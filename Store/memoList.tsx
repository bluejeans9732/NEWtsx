import { create, SetState } from "zustand";

export interface MemoItem {
  id: number;
  content: string;
}

export interface MemoStore {
  memoList: MemoItem[];
  addMemo: (val: string) => void;
  removeMemo: (id: number) => void;
}

export const useMemoStore = create<MemoStore>((set: SetState<MemoStore>) => ({
  memoList: [],
  addMemo: (val: string) =>
    set((prev) => ({
      memoList: [
        ...prev.memoList,
        { content: val, id: new Date().getMilliseconds() },
      ],
    })),
  removeMemo: (id: number) =>
    set((prev) => ({
      memoList: prev.memoList.filter((e) => e.id !== id),
    })),
}));