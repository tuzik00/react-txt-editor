import type { FC, ReactNode } from 'react';
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
    IconBorderedBlockquote,
    IconBorderedConclusion,
} from '@/components/Icons';

import { BlockTypes } from '@/constants/BlockTypes';

import type { BlockStyleRenderMapType } from './types';

const LineBreak: FC<{ children: ReactNode }> = ({ children }) => (
  <Box sx={{ mb: 2 }}>
    {children}
  </Box>
);

export const customBlockStyleRenderMap: BlockStyleRenderMapType = {
    [BlockTypes.UNSTYLED]: {
        element: ({ children, ...other }) => (
          <LineBreak>
            <Typography
              {...other}
              component={'div'}
            >
              {children}
            </Typography>
          </LineBreak>
        ),
    },
    [BlockTypes.H1]: {
        element: ({ children, ...other }) => (
          <LineBreak>
            <Typography
              {...other}
              variant={'h1'}
              component={'div'}
            >
              {children}
            </Typography>
          </LineBreak>
        ),
    },
    [BlockTypes.H2]: {
        element: ({ children, ...other }) => (
          <LineBreak>
            <Typography
              {...other}
              variant={'h2'}
              component={'div'}
            >
              {children}
            </Typography>
          </LineBreak>
        ),
    },
    [BlockTypes.H3]: {
        element: ({ children, ...other }) => (
          <LineBreak>
            <Typography
              {...other}
              variant={'h3'}
              component={'div'}
            >
              {children}
            </Typography>
          </LineBreak>
        ),
    },
    [BlockTypes.H4]: {
        element: ({ children, ...other }) => (
          <LineBreak>
            <Typography
              {...other}
              variant={'h4'}
              component={'div'}
            >
              {children}
            </Typography>
          </LineBreak>
        ),
    },
    [BlockTypes.H5]: {
        element: ({ children, ...other }) => (
          <LineBreak>
            <Typography
              {...other}
              variant={'h5'}
              component={'div'}
            >
              {children}
            </Typography>
          </LineBreak>
        ),
    },
    [BlockTypes.H6]: {
        element: ({ children, ...other }) => (
          <LineBreak>
            <Typography
              {...other}
              variant={'h6'}
              component={'div'}
            >
              {children}
            </Typography>
          </LineBreak>
        ),
    },
    [BlockTypes.BLOCKQUOTE]: {
        element: ({ children, ...other }) => (
          <LineBreak>
            <Box display={'flex'}>
              <Box>
                <IconBorderedBlockquote
                  style={{
                                width: 75,
                                height: 68,
                                marginRight: 10,
                            }}
                />
              </Box>

              <Typography
                {...other}
                component={'blockquote'}
              >
                {children}
              </Typography>
            </Box>
          </LineBreak>
        ),
    },
    [BlockTypes.CONCLUSION]: {
        element: ({ children, ...other }) => (
          <LineBreak>
            <Box display={'flex'}>
              <Box>
                <IconBorderedConclusion
                  style={{
                                width: 64,
                                height: 64,
                                marginRight: 10,
                            }}
                />
              </Box>

              <Typography
                {...other}
                component={'div'}
              >
                {children}
              </Typography>
            </Box>
          </LineBreak>
        ),
    },
    [BlockTypes.UL]: {
        element: ({ children, ...other }) => (
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
            sx={{ mb: 2 }}
            component={'ul'}
          />
        ),
    },
    [BlockTypes.OL]: {
        element: ({ children, ...other }) => (
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
            sx={{ mb: 2 }}
            component={'ol'}
          />
        ),
    },
};
