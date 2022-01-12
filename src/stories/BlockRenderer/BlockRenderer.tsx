import React, { FC } from 'react';

import { BlockRenderer } from '../..';

import { blockRenderMap } from './blockRenderMap';
import initState from './state';

const BlockRendererStory: FC = () => (
  <BlockRenderer
    state={initState}
    blockRenderMap={blockRenderMap}
  />
);

export default BlockRendererStory;
