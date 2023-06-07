'use client'

import React, { useState, FormEvent } from 'react';
import { useMemoStore } from '../../Store/memoList';

export default function ListInput(): JSX.Element {
  const { addMemo } = useMemoStore();
  const [value, setValue] = useState('');

  const handleAddMemo = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addMemo(value);
    setValue('');
  };

  return (
    <div className="flex flex-col p-2 rounded-lg border-stone-300 border-2">
      <div className=' mx-auto mb-4'>메모장 추가하기</div>
      <input
        id="memo-input"
        placeholder="내용"
        className="w-full h-[40px] mb-4 p-2 focus:outline-none focus:border-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="bg-sky-300 text-white w-[30%] ml-auto rounded-lg mb-2 mr-2"
        onClick={handleAddMemo}
      >
        추가
      </button>
    </div>
  );
}