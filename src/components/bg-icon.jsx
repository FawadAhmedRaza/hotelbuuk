import React from 'react';
import { Iconify } from '.';
import { cn } from '../libs/cn';

// Components and Others...


export const BgIcon = React.memo(
  ({iconName, className, iconClass, ...rests }) => {
    return (
        <span
          className={cn(
            ' flex items-center justify-center size-9 rounded-full cursor-pointer bg-white',
            className
          )}
          {...rests}
        >
          <Iconify iconName={iconName} className={iconClass} />
        </span>
    );
  }
);
