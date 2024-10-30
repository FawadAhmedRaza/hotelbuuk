import React from 'react'
import Skeleton from '../skeleton'

const PrivacyAndTermsSkeleton = () => {
  return (
    <div className="p-20 space-y-8">

    <div className='mb-20'>
      <Skeleton type="text" width="w-1/3" />
    </div>

    <div className='mb-20'>
      <Skeleton type="row" rows={3} />
    </div>
    <div className='mb-20'>
      <Skeleton type="text" width="w-1/3" />
    </div>

    <div className='mb-20'>
      <Skeleton type="row" rows={3} />
    </div>
    <div className='mb-20'>
      <Skeleton type="text" width="w-1/3" />
    </div>
    <div className='mb-20'>
      <Skeleton type="row" rows={3} />
    </div>
  </div>
  )
}

export default PrivacyAndTermsSkeleton
