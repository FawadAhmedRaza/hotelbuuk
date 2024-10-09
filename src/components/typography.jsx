import React from 'react';
import { cn } from '../libs/cn';


export const Typography = React.memo(
  ({ variant = 'h3', children, className = '', ...props }) => {
    const Component = variant;

    const baseClasses = 'text-gray-900';

    const variantClasses = {
      h1: ' text-3xl sm:text-4xl md:text-5xl font-semibold text-primary',
      h2: 'text-3xl md:text-42fs font-medium',
      h3: 'text-2xl sm:text-3xl md:text-4xl font-medium',
      h4: 'text-xl md:text-2xl font-normal tracking-none',
      h5: 'text-lg md:text-xl font-normal',
      h6: 'text-lg font-normal',
      p: 'text-sm md:text-base',
    };

    return (
      <Component
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
