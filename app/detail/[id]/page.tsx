import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';
import { WithId, Collection } from 'mongodb';

interface Post {
  _id: ObjectId;
  title: string;
  content: string;
}

export default async function Detail(props: { params: { id: string } }) {
  
  const client = await connectDB();
  const db = client.db('practsx');
  const collection: Collection<WithId<Post>> = db.collection('post');

  const postId = new ObjectId(props.params.id);
  const post = await collection.findOne({ _id: postId });

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='w-1/3 h-2/3 p-4 rounded-xl  shadow-xl bg-white'>
        <h4 className='mb-3 text-center text-2xl text-cyan-900 font-bold'>상세페이지</h4>
        <h4 className='mt-10 mb-3 ml-4 flex'><p className='mr-2 text-cyan-900 font-bold'>제목 : </p> {post?.title}</h4>
        <div className='mb-10 ml-4 flex'><p className='mr-2 text-cyan-900 font-bold'>내용 : </p> {post?.content}</div>
        <hr className='border-gray-300 my-3' />
      </div>
    </div>
  );
}