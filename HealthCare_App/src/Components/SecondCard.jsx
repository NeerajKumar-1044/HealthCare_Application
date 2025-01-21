import React from 'react'

function SecondCard({
    id,
    name,
    image_url
}) {
  return (
    <div className="max-w-sm rounded-lg w-[110px] h-[150px] overflow-hidden shadow-md bg-white text-center transition-transform transform hover:scale-105">
          <div className='flex justify-center p-1'>
          <img 
            className="w-28 h-28 rounded-full" 
            src={image_url} 
            alt="specialist" />
          </div>
            
            <div 
            className="font-bold text-lg mb-2 text-center">
                {name ?? "Medical Card"}</div>
      </div>
  )
}

export default SecondCard