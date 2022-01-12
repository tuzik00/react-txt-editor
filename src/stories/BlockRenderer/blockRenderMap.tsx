import React from 'react';

import {
  Markdown,
  BlockRendererBlockRenderMapType,
  CONTENT_BLOCK_NAME,
} from '../..';

import { TestBlock, BLOCK_NAME } from './TestBlock';

export const blockRenderMap: BlockRendererBlockRenderMapType = {
  [CONTENT_BLOCK_NAME]: {
    element: ({ data }) => (
      <Markdown content={data?.content as string} />
    ),
  },
  [BLOCK_NAME]: {
    element: ({ data }) => (
      <TestBlock text={data?.text as string} />
    ),
  },
};
