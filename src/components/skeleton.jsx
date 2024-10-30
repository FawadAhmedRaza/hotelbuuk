// components/Skeleton.js
import React from 'react';
import clsx from 'clsx';

const Skeleton = ({ type = 'text', rows = 1, columns = 1, width = 'w-full', height = 'h-4', className = '' }) => {
  const baseClasses = 'bg-gray-300 animate-pulse rounded';

  switch (type) {
    case 'text':
      return (
        <div className={clsx(baseClasses, width, height, className)}></div>
      );
    case 'row':
      return (
        <div className={clsx('space-y-2', className)}>
          {[...Array(rows)].map((_, i) => (
            <div key={i} className={clsx(baseClasses, width, height)}></div>
          ))}
        </div>
      );
    case 'column':
      return (
        <div className={clsx('grid', `grid-cols-${columns}`, 'gap-4', className)}>
          {[...Array(columns)].map((_, i) => (
            <div key={i} className={clsx(baseClasses, width, height)}></div>
          ))}
        </div>
      );
    case 'card':
      return (
        <div className={clsx('space-y-4 p-4 border border-gray-200 rounded-lg', className)}>
          <div className={clsx(baseClasses, 'w-full h-48')}></div>
          <div className={clsx(baseClasses, 'w-3/4 h-4')}></div>
          <div className={clsx(baseClasses, 'w-1/2 h-4')}></div>
        </div>
      );
    default:
      return <div className={clsx(baseClasses, width, height, className)}></div>;
  }
};

export default Skeleton;
