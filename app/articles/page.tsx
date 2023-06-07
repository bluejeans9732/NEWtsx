import { connectDB } from '@/util/database'
import { ObjectId } from 'bson';
import { WithId, Collection } from 'mongodb';
import { Articleslist } from './articleslist';

interface Post {
  _id: ObjectId | string; // ObjectId와 string 모두 허용하는 유니온 타입 이거 해줘야합니다 무조건
  title: string;
  content: string;
}

export default async function articles() {
  const client = await connectDB();
  const db = client.db('practsx')
  const collection: Collection<WithId<Post>> = db.collection('post');
  let result: Post[] = await collection.find().toArray();
  
  // _id를 문자열로 변환하는 코드
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });
  
  return (
    <div className="w-[50%] mx-auto ">
      <Articleslist result={result}/>
    </div>
  )
}
