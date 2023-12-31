import React from 'react'
import Link from 'next/link'
import jsonData from "../JsonData/category.json"



jsonData.sort((a, b) => {
    if (a.title && b.title) {
        return a.title.localeCompare(b.title);
    }
    // Handle cases where one or both objects don't have a "name" property
    return 0; // No change in sorting order
});


function Category_slider() {




    // Used like so
    var array = jsonData;

    return (
        <div className='flex items-start space-x-1 text-color overflow-x-scroll scrollbar-hide md:hidden mt-4'>

            {array.map(category => {
                return (
                    <Link href={`/${category.title.trim()}`} key={category.title} >
                        <div className='flex flex-col justify-center items-center mx-1 '>
                            <div className='w-[90px]'>
                                <img className='shadow-md rounded-full object-cover aspect-square' src={category.image} alt={category.title} loading="lazy"></img>
                            </div>
                            <h2 className='text-xs text-center font-poppins text-gray-600 font-medium mt-1 whitespace-nowrap'>{category.title.toUpperCase()}</h2>
                        </div>
                    </Link>
                )
            })}

        </div>
    )
}

export default Category_slider