import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb';

export default async function handler(요청: NextApiRequest, 응답: NextApiResponse): Promise<void> {
    
    const client = await connectDB();
    const db = client.db('practsx');
    let result = await db.collection('comment')
        .find({ parent : new ObjectId(요청.query.id as string)}) // 타입을 string으로 명시적으로 지정
        .toArray();
    응답.status(200).json(result);
    
}
