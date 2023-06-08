'use client'

import { useEffect, useState } from "react"

export default function Comment(props: { _id: string }) {
  let [comment, setComment] = useState("")
  let [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/comment/list?id=" + props._id)
      .then((r) => r.json())
      .then((result) => {
        setData(result)
      })
  }, [])

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleCommentSubmit = () => {
    fetch("/api/comment/new", {
      method: "POST",
      body: JSON.stringify({ comment: comment, _id: props._id }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData((prevData: any[]) => [...prevData, res])
        setComment("")
      })
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3 text-lg font-bold">댓글</div>
      {data.length > 0 ? (
        data.map((a, i) => {
          return (
            <p key={i} className="mb-2">
              {a.author_name} : {a.content}
            </p>
          )
        })
      ) : (
        "로딩중"
      )}
      <input
        className="bg-white border-2 border-red-200 mb-3 p-1"
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={handleCommentSubmit} className="w-[50%] mx-auto bg-emerald-300 p-2 rounded-xl">
        댓글전송
      </button>
    </div>
  )
}
