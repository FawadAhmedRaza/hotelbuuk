import React from 'react';
import { cn } from '../libs/cn';

export const Chip = React.memo(
  ({ variant = 'success', className, children, ...rests }) => {
    const Component = variant;

    const baseClasses =
      'font-inter font-semibold text-sm px-6 py-1.5 rounded-full w-fit cursor-pointer';

    const variantClasses = {
      default: 'bg-default-100 text-default-200',
      success: 'bg-success-100 text-success-200',
      danger: 'bg-danger-100 text-danger-200',
      info: 'bg-info-100 text-info-200',
    };

    return (
      <Component
        className={cn(baseClasses, variantClasses[variant], className)}
        {...rests}
      >
        {children}
      </Component>
    );
  }
);
