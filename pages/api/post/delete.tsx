import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';
import { WithId, Collection } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

interface Post {
    _id: ObjectId;
    title: string;
    content: string;
}

export default async function Delete(요청: NextApiRequest, 응답: NextApiResponse): Promise<void> {
    const client = await connectDB();
    const db = client.db('practsx');
    
    let session = await getServerSession(요청, 응답, authOptions)

    let findEmail = await db.collection('post').findOne({ _id: new ObjectId(요청.body) })
    const collection: Collection<WithId<Post>> = db.collection('post');
    
    
    if(findEmail !== null && session?.user?.email === findEmail.author) {
        const postId = new ObjectId(요청.body);
        const post = await collection.deleteOne({ _id: postId });
        return 응답.status(200).json('삭제완료')
    }
    

}