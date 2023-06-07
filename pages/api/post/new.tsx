import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function New(요청: NextApiRequest, 응답: NextApiResponse): Promise<void> {
    let session = await getServerSession(요청, 응답, authOptions)
    if(session) {
        요청.body.author = session?.user?.email
    }

    if (요청.method === 'POST') {
        const client = await connectDB();
        const db = client.db('practsx');
        let result = await db.collection('post').insertOne(요청.body);
        응답.redirect(302, '/articles');
    }
}