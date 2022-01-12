import {
  ReactElement,
} from 'react';

import { BlockType } from '@/utils/blocksConverter/types';

export type BlockConfigType = {
  element: (props: { data?: Record<string, unknown> }) => ReactElement;
  wrapper?: ReactElement;
};

export type BlockRenderMapType = {
  [key: string]: BlockConfigType;
};

export type BlockRendererPropsType = {
  state?: BlockType[];
  blockRenderMap?: BlockRenderMapType;
};
