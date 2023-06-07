import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';
import { WithId, Collection } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

interface Post {
    _id: ObjectId;
    title: string;
    content: string;
}

export default async function Edit(요청: NextApiRequest, 응답: NextApiResponse): Promise<void> {
    
    let 바꿀거 = {title : 요청.body.title, content : 요청.body.content}
    
    const client = await connectDB();
    const db = client.db('practsx');
    const collection: Collection<WithId<Post>> = db.collection('post');

    const postId = new ObjectId(요청.body._id);
    const post = await collection.updateOne(
        {_id: postId}, 
        {$set: 바꿀거}
    );
    응답.redirect(302, '/articles');
}