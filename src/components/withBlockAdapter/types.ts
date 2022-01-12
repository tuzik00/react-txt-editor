import { FunctionComponent } from 'react';

import type {
  ContentBlock,
  ContentState,
  SelectionState,
} from 'draft-js';

import type { BlockConfigType } from '@/components/BlockToolbar/hooks/useBlockToolbar/types';

export type WrapperPropsType = {
  block: ContentBlock;
  blockProps?: Record<string, unknown>;
  contentState: ContentState;
  selectionState: SelectionState;
};

export type WithBlockAdapterType = (
  block: BlockConfigType,
  options: {
    isActive: boolean,
  },
) => FunctionComponent<WrapperPropsType>;
