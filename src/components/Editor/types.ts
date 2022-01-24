import type { ReactChildren, ReactElement } from 'react';
import type { RawDraftContentState } from 'draft-js';
import { StateTypes } from '@/constants/StateTypes';

import type {
  RenderFnType as RenderInlineToolbarFnType,
  AllowTypes as InlineToolbarAllowTypes,
} from '@/components/InlineToolbar/hooks/useInlineToolbar/types';

import type {
  BlockRenderMapType,
  RenderFnType as RenderBlockToolbarFnType,
} from '@/components/BlockToolbar/hooks/useBlockToolbar/types';

export type StyleBlockConfigType = {
  element: (props: { children: ReactChildren }) => ReactElement;
  wrapper?: ReactElement;
};

export type StyleBlockRenderMapType = {
  [key: string]: StyleBlockConfigType;
};

export type EditorPropsType = {
  isActive?: boolean;
  isAutoFocus?: boolean;
  placeholder?: string;
  state?: RawDraftContentState;
  stateType?: StateTypes;
  onChange?: (blocks: RawDraftContentState) => void;
  inlineToolbarAllowTypes?: InlineToolbarAllowTypes;
  renderInlineToolbar?: RenderInlineToolbarFnType;
  renderBlockToolbar?: RenderBlockToolbarFnType;
  styleBlockRenderMap?: StyleBlockRenderMapType;
  blockRenderMap?: BlockRenderMapType;
};
