import ListInput from './listInput'
import BoardList from './boardList'

export default function listboard() {
    return (
      <div className="w-[50%] h-screen mx-auto">
        <div className="bg-[#81b771] w-[80%] h-[50%] mx-auto mt-10 border-[#875a36] border-[14px]">
          <BoardList />
        </div>
        <div className="w-[200px]  mx-auto mt-10">
          <ListInput />
        </div>
      </div>
    )
}
  