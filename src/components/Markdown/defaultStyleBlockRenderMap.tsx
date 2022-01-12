import React from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { TagTypes } from './constants';
import type { StyleBlockRenderMapType } from './types';

export const defaultStyleBlockRenderMap: StyleBlockRenderMapType = {
  [TagTypes.H1]: ({ children }) => (
    <Typography variant={'h1'}>
      {children}
    </Typography>
  ),

  [TagTypes.H2]: ({ children }) => (
    <Typography variant={'h2'}>
      {children}
    </Typography>
  ),

  [TagTypes.H3]: ({ children }) => (
    <Typography variant={'h3'}>
      {children}
    </Typography>
  ),

  [TagTypes.H4]: ({ children }) => (
    <Typography variant={'h4'}>
      {children}
    </Typography>
  ),

  [TagTypes.H5]: ({ children }) => (
    <Typography variant={'h5'}>
      {children}
    </Typography>
  ),

  [TagTypes.H6]: ({ children }) => (
    <Typography variant={'h6'}>
      {children}
    </Typography>
  ),

  [TagTypes.BLOCKQUOTE]: ({ children }) => (
    <Typography component={'blockquote'}>
      {'"'}
      {children}
      {'"'}
    </Typography>
  ),

  [TagTypes.PARAGRAPH]: ({ children }) => (
    <Typography>
      {children}
    </Typography>
  ),

  [TagTypes.LINK]: ({ children, href }) => (
    <Link
      href={href as string}
      title={href as string}
    >
      {children}
    </Link>
  ),

  [TagTypes.LI]: ({ children }) => (
    <Typography component={'li'}>
      {children}
    </Typography>
  ),

  [TagTypes.UL]: ({ children }) => (
    <Typography
      style={{ paddingLeft: '18px' }}
      component={'ul'}
    >
      {children}
    </Typography>
  ),

  [TagTypes.OL]: ({ children }) => (
    <Typography
      style={{ paddingLeft: '18px' }}
      component={'ol'}
    >
      {children}
    </Typography>
  ),

  [TagTypes.BOLD]: ({ children }) => (
    <Typography
      component={'b'}
      style={{
        fontWeight: 'bold',
        fontSize: 'inherit',
      }}
    >
      {children}
    </Typography>
  ),

  [TagTypes.ITALIC]: ({ children }) => (
    <Typography
      component={'i'}
      style={{
        fontSize: 'inherit',
      }}
    >
      {children}
    </Typography>
  ),

  [TagTypes.STRIKETHROUGH]: ({ children }) => (
    <Typography
      component={'del'}
      style={{
        fontWeight: 'inherit',
        fontSize: 'inherit',
      }}
    >
      {children}
    </Typography>
  ),
};
