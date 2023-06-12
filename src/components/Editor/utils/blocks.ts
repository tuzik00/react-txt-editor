import type {
    DraftBlockType,
    DraftRemovalDirection,
} from 'draft-js';

import {
    ContentBlock,
    ContentState,
    EditorState,
    genKey,
    Modifier,
    SelectionState,
} from 'draft-js';

import {
    List,
    Map,
} from 'immutable';

import { insertNewUnstyledBlock } from 'draftjs-utils';

import { ChangeTypes } from '@/constants/ChangeTypes';
import { BlockTypes } from '@/constants/BlockTypes';

export const getBlockType = (editorState: EditorState): DraftBlockType => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();

    return contentState
        .getBlockForKey(anchorKey)
        .getType();
};

export const isCustomBlockType = (editorState: EditorState, blocks: string[]): boolean => {
    const blockType = getBlockType(editorState);
    return blocks.includes(blockType);
};

export const getCurrentBlock = (editorState: EditorState): ContentBlock => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    return contentState.getBlockForKey(selectionState.getStartKey());
};

export const addNewBlock = (
    editorState: EditorState,
    newType = BlockTypes.UNSTYLED,
    initialData = {},
): EditorState => {
    const selectionState = editorState.getSelection();

    if (!selectionState.isCollapsed()) {
        return editorState;
    }

    const contentState = editorState.getCurrentContent();
    const currentBlock = getCurrentBlock(editorState);

    if (!currentBlock) {
        return editorState;
    }

    if (currentBlock.getLength() === 0) {
        if (currentBlock.getType() === newType) {
            return editorState;
        }

        const newBlock = currentBlock.merge({
            type: newType,
            data: initialData,
        });

        const key = selectionState.getStartKey();
        const blockMap = contentState.getBlockMap();

        const newContentState = contentState.merge({
            blockMap: blockMap.set(key, new ContentBlock(newBlock)),
            selectionAfter: selectionState,
        });

        const newState = EditorState.push(
            editorState,
            new ContentState(newContentState),
            ChangeTypes.CHANGE_BLOCK_TYPE,
        );

        return insertNewUnstyledBlock(newState);
    }

    return editorState;
};

export const removeBlock = (
    editorState: EditorState,
    block: ContentBlock,
    removeDirection: DraftRemovalDirection = 'backward',
): EditorState => {
    if (!block) {
        return editorState;
    }

    const blockKey = block.getKey();
    const content = editorState.getCurrentContent();
    const contentBlock = content.getBlockForKey(blockKey);

    const targetRange = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: contentBlock.getLength(),
    });

    const withoutTeX = Modifier.removeRange(content, targetRange, removeDirection);
    const resetBlock = Modifier.setBlockType(
        withoutTeX,
        withoutTeX.getSelectionAfter(),
        BlockTypes.UNSTYLED,
    );

    const newState = EditorState.push(
        editorState,
        resetBlock,
        ChangeTypes.REMOVE_RANGE,
    );

    return EditorState.forceSelection(
        newState,
        resetBlock.getSelectionAfter(),
    );
};

export const setBlockData = (
    editorState: EditorState,
    block: ContentBlock,
    blockData: Map<string, unknown>,
): EditorState => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const blockKey = block.getKey();

    const updatedSelection = selection.merge({
        focusKey: blockKey,
        anchorKey: blockKey,
        focusOffset: 0,
    });

    let newContentState;

    if (!blockData) {
        newContentState = Modifier.setBlockData(
            currentContent,
            updatedSelection,
            Map({}),
        );
    } else {
        newContentState = Modifier.mergeBlockData(
            currentContent,
            updatedSelection,
            blockData,
        );
    }

    return EditorState.push(
        editorState,
        newContentState,
        ChangeTypes.CHANGE_BLOCK_DATA,
    );
};

export const getPrevBlock = (editorState: EditorState): ContentBlock | undefined => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();
    const blockKey = getCurrentBlock(editorState).getKey();
    const index = blockMap.keySeq().findIndex((k) => k === blockKey);

    return blockMap.toList().get(index - 1);
};

export const getNextBlock = (editorState: EditorState): ContentBlock | undefined => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();
    const blockKey = getCurrentBlock(editorState).getKey();
    const index = blockMap.keySeq().findIndex((k) => k === blockKey);

    return blockMap.toList().get(index + 1);
};

export const resetBlockWithType = (
    editorState: EditorState,
    newType = BlockTypes.UNSTYLED,
    overrides = {},
): EditorState => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const key = selectionState.getStartKey();
    const blockMap = contentState.getBlockMap();
    const block = blockMap.get(key);

    const newBlock = block?.mergeDeep(overrides, {
        type: newType,
        data: {},
    });

    const newContentState = contentState.merge({
        blockMap: blockMap.set(key, new ContentBlock(newBlock as ContentBlock)),
        selectionAfter: selectionState.merge({
            anchorOffset: 0,
            focusOffset: 0,
        }),
    });

    return EditorState.push(
        editorState,
        new ContentState(newContentState),
        ChangeTypes.CHANGE_BLOCK_TYPE,
    );
};

export const addNewBlockAt = (
    editorState: EditorState,
    pivotBlockKey: string,
    newBlockType = BlockTypes.UNSTYLED,
    initialData = {},
): EditorState => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();
    const block = blockMap.get(pivotBlockKey);

    if (!block) {
        throw new Error(`The pivot key - ${pivotBlockKey} is not present in blockMap.`);
    }

    const blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
    const blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
    const newBlockKey = genKey();

    const newBlock = new ContentBlock({
        key: newBlockKey,
        type: newBlockType,
        text: '',
        characterList: List(),
        depth: 0,
        data: Map(initialData),
    });

    const newBlockMap = blocksBefore.concat(
        [[pivotBlockKey, block], [newBlockKey, newBlock]],
        blocksAfter,
    ).toOrderedMap();

    const selection = editorState.getSelection();

    const newContentState = content.merge({
        blockMap: newBlockMap,
        selectionBefore: selection,
        selectionAfter: selection.merge({
            anchorKey: newBlockKey,
            anchorOffset: 0,
            focusKey: newBlockKey,
            focusOffset: 0,
            isBackward: false,
        }),
    });

    return EditorState.push(
        editorState,
        new ContentState(newContentState),
        'split-block',
    );
};
