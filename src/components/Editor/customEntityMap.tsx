import React from 'react';
import Link from '@mui/material/Link';

import { EntityTypes } from '@/constants/EntityTypes';

import type { EntityMapType } from './types';

export const customEntityMap: EntityMapType = {
    [EntityTypes.LINK]: ({
        children,
        href,
        title,
    }) => (
      <Link
        href={href}
        title={title}
      >
        {children}
      </Link>
    ),
    [EntityTypes.DIRECTIVE_LINK]: ({
        children,
        href,
        title,
        id,
        classNames,
    }) => (
      <Link
        id={id}
        className={classNames}
        href={href}
        title={title}
      >
        {children}
      </Link>
    ),
};
