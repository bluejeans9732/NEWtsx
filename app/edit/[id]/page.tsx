// edit.tsx

import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';
import { WithId, Collection } from 'mongodb';
import { Post } from '@/util/types';
import Link from 'next/link';

export default async function Edit(props: { params: { id: string } }) {
  const client = await connectDB();
  const db = client.db('practsx');
  const collection: Collection<WithId<Post>> = db.collection('post');

  const postId = new ObjectId(props.params.id);
  const post = await collection.findOne({ _id: postId });

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='w-1/3 h-[45%] p-4 rounded-xl  shadow-xl bg-white'>
        <h4 className='mb-3 mt-8 text-center text-2xl text-cyan-900 font-bold'>
          글 수정
        </h4>
        <form action="/api/post/edit" method="POST">
          <div className='flex mt-10 mb-10'>
            <div className='mr-2 text-cyan-900 font-bold p-2'>제목 : </div>
            <input
              name='title'
              className='ml-4 w-[75%] flex border-2 p-2 focus:outline-none '
              defaultValue={post?.title}
            />
          </div>
          <div className='flex mt-10 mb-10'>
            <div className='mr-2 text-cyan-900 font-bold p-2'>내용 : </div>
            <input
              name='content'
              className='mb-10 ml-4 w-[75%] flex p-2 border-2 focus:outline-none'
              defaultValue={post?.content}
            />
          </div>
          <input
            name='_id'
            className='mb-2 p-2 hidden'
            defaultValue={post?._id.toString()}
          />
          <button
            type='submit'
            className='bg-emerald-300 rounded-lg mx-auto p-2 block'
          >
            테스트 글수정 버튼
          </button>
        </form>
      </div>
    </div>
  );
}

export async function generateStaticParamsEdit() {
  const client = await connectDB();
  const db = client.db('practsx');
  const collection: Collection<WithId<Post>> = db.collection('post');

  const posts = await collection.find().toArray();
  const postIds = posts.map((post) => post._id.toString());

  client.close();

  return postIds.map((id) => ({ params: { id } }));
}
