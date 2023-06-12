import type { FC } from 'react';

import type {
    ContentBlock,
    ContentState,
    SelectionState,
} from 'draft-js';

import type { EditorBlockConfigType } from '../../types';

export type WrapperPropsType = {
    block: ContentBlock;
    blockProps?: Record<string, unknown>;
    contentState: ContentState;
    selectionState: SelectionState;
};

export type WithBlockAdapterType = (
    block: EditorBlockConfigType,
    options: {
        blockType: string;
        isDisabled: boolean;
    },
) => FC<WrapperPropsType>;
