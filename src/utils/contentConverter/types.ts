import type {
    DraftBlockType,
    RawDraftContentState,
    RawDraftEntityRange,
    RawDraftInlineStyleRange,
} from 'draft-js';

import type { EditorBlockConfigMapType } from '@/components/Editor';

export type EmptyBlockParamsType = {
    key?: string;
    type?: DraftBlockType;
    text?: string;
    depth?: number;
    inlineStyleRanges?: RawDraftInlineStyleRange[];
    entityRanges?: RawDraftEntityRange[];
    data?: { [key: string]: unknown; };
};

export type BlocksToDraftType = (
    editorBlocks: ContentSchemaType[],
) => RawDraftContentState;

export type DraftToBlocksType = (
    raw: RawDraftContentState,
    contentType: 'md' | 'blocks',
    customBlocks?: EditorBlockConfigMapType,
) => ContentSchemaType[];

export type ContentSchemaType = {
    type: string;
    data: Record<string, string | number> | null;
    children?: ContentSchemaType[];
};
