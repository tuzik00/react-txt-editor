import React, { ReactChildren } from 'react';
import Typography from '@mui/material/Typography';
import { BlockTypes } from '@/constants/BlockTypes';

export const defaultStyleBlockRenderMap = {
  [BlockTypes.UNSTYLED]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        component={'div'}
      >
        {children}
      </Typography>
    ),
  },
  [BlockTypes.H1]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        variant={'h1'}
        component={'div'}
      >
        {children}
      </Typography>
    ),
  },
  [BlockTypes.H2]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        variant={'h2'}
        component={'div'}
      >
        {children}
      </Typography>
    ),
  },
  [BlockTypes.H3]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        variant={'h3'}
        component={'div'}
      >
        {children}
      </Typography>
    ),
  },
  [BlockTypes.H4]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        variant={'h4'}
        component={'div'}
      >
        {children}
      </Typography>
    ),
  },
  [BlockTypes.H5]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        variant={'h5'}
        component={'div'}
      >
        {children}
      </Typography>
    ),
  },
  [BlockTypes.H6]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        variant={'h6'}
        component={'div'}
      >
        {children}
      </Typography>
    ),
  },
  [BlockTypes.BLOCKQUOTE]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        component={'blockquote'}
      >
        {'"'}
        {children}
        {'"'}
      </Typography>
    ),
  },
  [BlockTypes.UL]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        component={'li'}
      >
        {children}
      </Typography>
    ),
    wrapper: (
      <Typography
        style={{ paddingLeft: '18px' }}
        component={'ul'}
      />
    ),
  },
  [BlockTypes.OL]: {
    element: ({ children, ...other }: { children: ReactChildren }) => (
      <Typography
        {...other}
        component={'li'}
      >
        {children}
      </Typography>
    ),
    wrapper: (
      <Typography
        style={{ paddingLeft: '18px' }}
        component={'ol'}
      />
    ),
  },
};
