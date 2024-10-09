import Image from 'next/image'
import React from 'react'
import { Button, Pannel, Typography } from '../components'

export const HeroSection = React.memo(() => {
    return (
        <Pannel className=' relative flex justify-center items-center w-full h-screen bg-hero bg-center bg-no-repeat bg-cover -z-10'>
            <Image src="/assets/images/hero-bg.png" alt='bg' width={100} height={100} className='w-full h-screen absolute top-0 left-0 z-0' />

            <div className='flex flex-col justify-center  gap-5 md:gap-8 z-20 w-full h-full '>
                <Typography variant="h1" className="text-white font-medium ">Hotelbuuk is where you will find valuable
                    business insights from hotels.
                </Typography>
                <Typography variant="h5" className=" text-base sm:text-lg md:text-xl text-white tracking-widest font-normal">Hotelbuuk is where you will find valuable
                    business insights from hotels.
                </Typography>
                <Button endIcon="ph:arrow-right-bold" className="mx-auto mt-6 z-40">Book Now</Button>
            </div>
        </Pannel>
    )
})
