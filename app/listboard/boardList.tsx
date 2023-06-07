'use client'

import React from 'react';
import { useMemoStore, MemoItem } from '../../Store/memoList';

export default function BoardList(): JSX.Element {
  const { memoList, removeMemo } = useMemoStore();

  const handleRemoveMemo = (id: number): void => {
    removeMemo(id);
  };

  return (
    <div className="h-[100%] flex flex-wrap justify-center items-center align-middle pt-4">
      {memoList.length !== 0 ? (
        memoList.map((memo: MemoItem, index: number) => (
          index < 6 && (
            <div key={memo.id} className="relative w-[30%] h-[40%] ml-4">
              <div className="w-full h-full p-2 border-2 border-yellow-200 bg-[#ffffe0] rounded-lg text-center flex flex-col items-center justify-center gap-4 z-10">
                {memo.content}
                <button
                  onClick={() => handleRemoveMemo(memo.id)}
                  className="p-1 bg-transparent border border-gray-300 text-gray-900 absolute top-4 right-4 rounded-md"
                >
                  삭제
                </button>
              </div>
            </div>
          )
        ))
      ) : (
        <div className="text-white">내용을 적어주세요</div>
      )}
      {memoList.length > 6 && <div className="text-red-500">6개까지만 추가할 수 있습니다.</div>}
    </div>
  );
}