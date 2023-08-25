import React from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import categories from "../JsonData/category.json"



function Sidebar() {
    const router = useRouter();


    categories.sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title);
        }
        // Handle cases where one or both objects don't have a "name" property
        return 0; // No change in sorting order
      });


    return (
        <div className='hidden md:flex md:flex-col mr-2' >
            {categories.map(category => {
                return (

                    <Link key={category.title} href={`/${category.title.trim()}`}>
                        <h2 className="w-44 text-md border-2 border-white hover:bg-button-secondary hover:text-light-text rounded-md text-dark-text  p-1 pl-4 pr-2 cursor-pointer bg-gray-300 capitalize">{category.title}</h2>
                    </Link>

                )
            })}

        </div>
    )
}

export default Sidebar