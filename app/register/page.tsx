export default function Register() {
    return (
      <div className="flex pt-[100px] justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        
        <form method="POST" action="/api/auth/signup" className="w-1/3 h-[45%] p-4 rounded-xl  shadow-xl bg-white flex flex-col">
          <h4 className='mt-4 mb-3 text-center text-2xl text-cyan-900 font-bold'>회원 가입</h4>
          <input name="name" type="text" placeholder="이름" className="w-4/5 mx-auto mt-6 p-2 shadow-md focus:outline-none focus:border-none"/> 
          <input name="email" type="text" placeholder="이메일" className="w-4/5 mx-auto mt-6 p-2 shadow-md focus:outline-none focus:border-none"/>
          <input name="password" type="password" placeholder="비번" className="w-4/5 mx-auto mt-6 p-2 shadow-md focus:outline-none focus:border-none"/>
          <button type="submit" className="mt-10 bg-emerald-300 w-1/2 mx-auto rounded-lg p-2">id/pw 가입요청</button>
        </form>
    </div>
    )
}