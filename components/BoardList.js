import Link from 'next/link.js'
import React from 'react'

const BoardList = ({boards}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' >
        {boards.map((board)=>(
            <Link key={board.id} href={`/boards/${board.id}`} className='black p-6 bg-[#EBECF0] rounded-md hover:shadow-lg transition' >
                <h2 className='text-xl font-semibold'>{board.title}</h2>
            </Link>
        ))}
    </div>
  )
}

export default BoardList