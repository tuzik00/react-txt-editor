import type {
    DraftBlockType,
    Entity,
    RawDraftContentBlock,
    RawDraftContentState,
    RawDraftEntity,
    RawDraftEntityRange,
    RawDraftInlineStyleRange,
} from 'draft-js';

import type { Remarkable } from 'remarkable';

import type { EditorBlockConfigMapType } from '@/components/Editor';

export type BlockEntitiesParamType = {
    [key: string]: (item?: { [key: string]: unknown; }) => Entity;
};

export type EntityItemsType = {
    [key: string]: {
        open: (entity?: RawDraftEntity, block?: RawDraftContentBlock) => string;
        close: (entity?: RawDraftEntity, block?: RawDraftContentBlock) => string;
    };
};

export type StyleItemsType = {
    [key: string]: {
        open: (block?: RawDraftContentBlock, number?: number) => string;
        close: (block?: RawDraftContentBlock) => string;
    };
};

export type RenderBlockType = (
    block: RawDraftContentBlock,
    index: number,
    rawDraftObject: RawDraftContentState,
    orderedList?: Record<number, number>,
    customBlocks?: EditorBlockConfigMapType,
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
    data?: { [key: string]: unknown; };
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
    inlineBlocks: BlockParamsType[];
    blockEntities: Record<string, unknown>;
};

export type ParseDirectiveNodeType = {
    name: string;
    type: string;
    value: string;
    attributes: Record<string, any>;
    children: ParseDirectiveNodeType[];
    position: {
        start: { offset: number; };
        end: { offset: number; };
    };
};

export type ParseDirectiveFnTypeCallbackFnType = (
    data: {
        name: string;
        attrs: Record<string, any>; text: string;
        offset: number;
        length: number;
    },
) => void;

export type MdToDraftType = (
    markdown: string,
) => {
    entityMap: Record<string, unknown>;
    blocks: BlockParamsType[];
};
