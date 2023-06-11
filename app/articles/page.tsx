import { connectDB } from '@/util/database'
import { WithId, Collection } from 'mongodb';
import { Articleslist } from './articleslist';

import { Postprops } from '@/util/types'



export default async function articles() {
  const client = await connectDB();
  const db = client.db('practsx')
  const collection: Collection<WithId<Postprops>> = db.collection('post');
  let result: Postprops[] = await collection.find().toArray();
  
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