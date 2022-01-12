import { nanoid } from 'nanoid';
import { RawDraftContentBlock } from 'draft-js';

import type { EmptyBlockParamsType } from './types';

export const CONTENT_BLOCK_NAME = 'MARKDOWN';

export const createEmptyBlock = (
  props?: EmptyBlockParamsType,
): RawDraftContentBlock => ({
  key: nanoid(5),
  depth: 0,
  text: '',
  type: '',
  data: {},
  inlineStyleRanges: [],
  entityRanges: [],
  ...(props || {}),
});
