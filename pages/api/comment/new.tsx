import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(요청: NextApiRequest, 응답: NextApiResponse): Promise<void> {
    let session = await getServerSession(요청, 응답, authOptions)


    if(요청.method == 'POST') {
        요청.body = JSON.parse(요청.body)
        let 저장할거 = {
            content : 요청.body.comment,
            parent : new ObjectId(요청.body._id),
            author : session?.user?.email,
            author_name : session?.user?.name
        }

        const client = await connectDB();
        const db = client.db('practsx');
        let result = await db.collection('comment').insertOne(저장할거)

        응답.status(200).json(저장할거)
        
    }
}