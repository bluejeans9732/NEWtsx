'use client'

import { ObjectId } from 'bson';
import Link from 'next/link';
import { Postprops } from '@/util/types'




export interface ArticleslistProps {
  result: Postprops[];
}

export function Articleslist(props: ArticleslistProps) {
  const { result } = props;

  return (
    <div className=''>
      {result.length === 0 ? (
        <p>게시글이 없어요</p>
      ) : (
        result.map((item) => (
          <div key={item._id.toString()} className='pt-4 h-[120px] mt-4 mb-4 border-2 w-[50%] mx-auto rounded-lg bg-emerald-300/50 border-violet-200 flex flex-col justify-center items-center font-bold'>
            <Link href={`/detail/${item._id.toString()}`}>{item.title}</Link>

            <div className='flex mt-4'>
              <div className='pl-2'>
                <Link href={`/edit/${item._id.toString()}`}>✏️</Link></div>
              <span className=' cursor-pointer ml-4' 
                onClick={(e)=> {
                  fetch('/api/post/delete', {
                    method : 'POST',
                    body : item._id.toString()
                  }).then(() => {
                    window.location.reload();
                  });
                }}
              >
                ✂️
              </span>
            </div>
          </div>
        ))
      )}
      <div className='mt-4 h-[120px] border-2 w-[50%] mx-auto rounded-lg text-4xl flex justify-center items-center bg-emerald-300 text-white'>
        <Link href='/write'>+</Link>
      </div>
    </div>
  );
}