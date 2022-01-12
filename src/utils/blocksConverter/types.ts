import type {
  RawDraftContentState,
  DraftBlockType,
  RawDraftInlineStyleRange,
  RawDraftEntityRange,
} from 'draft-js';

export type BlockType = {
  type: string;
  data: Record<string, unknown> | null;
};

export type EmptyBlockParamsType = {
  key?: string;
  type?: DraftBlockType;
  text?: string;
  depth?: number;
  inlineStyleRanges?: RawDraftInlineStyleRange[];
  entityRanges?: RawDraftEntityRange[];
  data?: { [key: string]: unknown };
};

export type BlocksToDraftType = (
  editorBlocks: BlockType[],
) => RawDraftContentState;

export type DraftToBlocksType = (
  raw: RawDraftContentState,
) => BlockType[];
