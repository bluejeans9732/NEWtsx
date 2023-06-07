'use client'

import { signIn, signOut } from 'next-auth/react'

export function LoginBtn() {
    return (
        <button onClick={()=>{ signIn() }} className='bg-gray-200 '>로그인</button>
    )
}

export function LogoutBtn() {
    return (
        <button onClick={()=>{ signOut() }} className='bg-gray-200'>로그아웃</button>
    )
}