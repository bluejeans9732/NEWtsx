import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/util/database'
import bcrypt from 'bcrypt'

export default async function handler(요청: NextApiRequest, 응답: NextApiResponse) {
    if (요청.method === 'POST') {
        let hash = await bcrypt.hash(요청.body.password, 10)
        요청.body.password = hash

        const client = await connectDB();
        const db = client.db('practsx')

        if (!요청.body.name || !요청.body.email || !요청.body.password) {
            return 응답.status(400).json('빈칸을 채워주세요')
        }

        let user = await db.collection('user_cred').findOne({ email: 요청.body.email })
        if (user) {
            return 응답.status(400).json('아이디가 이미 존재합니다')
        }
        await db.collection('user_cred').insertOne(요청.body)
        return 응답.redirect(302, '/')
    }
}