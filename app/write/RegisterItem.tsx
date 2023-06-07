

export default function RegisterItem() {
    return (
        <div className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='w-1/3 h-1/2 p-4 rounded-xl  shadow-xl bg-white'>
                <h4 className='mb-3 text-center text-2xl text-cyan-900 font-bold'>새로운 글 작성</h4>
                <form action="/api/post/new" method="POST" className="flex flex-col mt-10">
                    <input name="title" placeholder="글제목" className="mb-2 p-2 focus:outline-none focus:border-none"/>
                    <input name="content" placeholder="글내용" className="mb-2 p-2 mt-6 focus:outline-none focus:border-none"/>
                    <button type="submit" className="bg-emerald-400 mb-2 p-2 w-1/2 mx-auto mt-20 rounded-lg text-white" >테스트 글추가 버튼</button>
                </form>
            </div>
        </div>


    )
}