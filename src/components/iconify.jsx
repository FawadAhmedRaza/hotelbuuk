import React from 'react';

import { Icon } from '@iconify/react';
import { cn } from '../libs/cn';

export const Iconify = React.memo(({ iconName, className, ...rests }) => {
  return (
    <Icon
      {...rests}
      icon={iconName}
      className={cn('size-5 text-white', className)}
    />
  );
});
