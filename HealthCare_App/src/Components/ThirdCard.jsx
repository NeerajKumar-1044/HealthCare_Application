import React from 'react'

function ThirdCard({
    id,
    image_url,
    name
}) {
    return (

        <div className=" bg-white border w-[150px] h-[200px] border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 p-2 
        transition-transform transform hover:scale-105 overflow-hidden">
            <img className="w-full h-[80%] rounded-t-lg md:h-[80%] md:w-full md:rounded-none md:rounded-s-lg" src={image_url} alt="IMG" />
            <div className="flex flex-col justify-between text-center ">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{name}</h5>
            </div>
        </div>

    )
}

export default ThirdCard