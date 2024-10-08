import React from 'react'
import { Iconify, Typography } from '../components'

export const NavBar = React.memo(() => {
    return (
        <div className='w-full h-auto flex justify-end items-center gap-5 py-5 absolute top-0 z-20 px-8'>

            {/* language  */}
            <div className='flex items-center gap-3 cursor-pointer px-4 py-2  rounded-lg hover:bg-black hover:bg-opacity-20'>
                <Iconify iconName="et:global" className="size-8" />
                <Typography variant="p" className="text-sm text-white " >English</Typography>
                <Iconify iconName="iconamoon:arrow-down-2" className="size-6 -ml-1" />
            </div>

            {/* Login  */}
            <div className='flex items-center gap-5 border border-white rounded-lg px-4 py-2 cursor-pointer hover:bg-black hover:bg-opacity-20'>
                <Iconify iconName="material-symbols:menu" className="size-8" />
                <Iconify iconName="fluent:person-circle-12-filled" className="size-8" />
            </div>
        </div>
    )
})
