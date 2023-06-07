export default function Register() {
    return (
      <div className=" w-[30%] mx-auto mt-10">
          <form method="POST" action="/api/auth/signup" className="flex flex-col">
            <input name="name" type="text" placeholder="이름" className="border-2 mb-4 p-2"/> 
            <input name="email" type="text" placeholder="이메일" className="border-2 mb-4 p-2"/>
            <input name="password" type="password" placeholder="비번" className="border-2 mb-4 p-2"/>
            <button type="submit" className="bg-gray-300 p-2">id/pw 가입요청</button>
          </form>
      </div>
    )
}