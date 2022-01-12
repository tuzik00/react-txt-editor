import {
  Entity,
  RawDraftContentState,
  RawDraftContentBlock,
  RawDraftEntity,
  DraftBlockType,
  RawDraftInlineStyleRange,
  RawDraftEntityRange,
} from 'draft-js';

import { Remarkable } from 'remarkable';

export type BlockEntitiesParamType = {
  [key: string]: (item?: { [key: string]: unknown }) => Entity;
};

export type BlockTypesParamType = {
  [key: string]: (item?: {
    [key: string]: unknown;
  }) => {
    [key: string]: unknown;
  };
};

export type EntityItemsType = {
  [key: string]: {
    open: (entity?: RawDraftEntity, block?: RawDraftContentBlock) => string;
    close: (entity?: RawDraftEntity, block?: RawDraftContentBlock) => string;
  },
};

export type StyleItemsType = {
  [key: string]: {
    open: (block?: RawDraftContentBlock, number?: number) => string;
    close: (block?: RawDraftContentBlock) => string;
  },
};

export type RenderBlockType = (
  block: RawDraftContentBlock,
  index: number,
  rawDraftObject: RawDraftContentState,
  orderedList?: Record<number, number>,
) => string;

export type DraftToMdType = (
  RawDraft: RawDraftContentState,
) => string;

export type BlockParamsType = {
  key?: string;
  type?: DraftBlockType;
  text?: string;
  depth?: number;
  inlineStyleRanges?: RawDraftInlineStyleRange[];
  entityRanges?: RawDraftEntityRange[];
  data?: { [key: string]: unknown };
};

export type BlockEntityType = {
  type: string;
  mutability: string;
  data: Record<string, unknown>;
};

export type DefaultBlocksType = {
  [key: string]: (params?: Remarkable.Token) => BlockParamsType;
} & {
  paragraph_open: (params?: Remarkable.ParagraphOpenToken) => BlockParamsType;
  blockquote_open: (params?: Remarkable.BlockquoteOpenToken) => BlockParamsType;
  ordered_list_item_open: (params?: Remarkable.OrderedListOpenToken) => BlockParamsType;
  unordered_list_item_open: (params?: Remarkable.OrderedListOpenToken) => BlockParamsType;
  fence: (params?: Remarkable.FenceToken) => BlockParamsType;
  heading_open: (params?: Remarkable.HeadingToken) => BlockParamsType;
};

export type DefaultBlockEntitiesType = {
  [key: string]: (params?: Remarkable.Token) => BlockEntityType;
} & {
  link_open: (params?: Remarkable.LinkOpenToken) => BlockEntityType;
};

export type ParseInlineType = (
  inlineItem: Remarkable.BlockContentToken,
  BlockEntities: DefaultBlockEntitiesType,
  BlockStyles: Record<string, unknown>,
) => {
  content: string;
  blockEntities: Record<string, unknown>;
  blockInlineStyleRanges: RawDraftInlineStyleRange[];
  blockEntityRanges: RawDraftEntityRange[];
};

export type MdToDraftType = (
  markdown: string,
) => {
  entityMap: Record<string, unknown>,
  blocks: BlockParamsType[],
};
