import type { EntityInstance } from 'draft-js';

import {
    EditorState,
    Modifier,
    RichUtils,
} from 'draft-js';

import {
    getSelectedBlocksType,
    getSelectionEntity as getSelectionEntityKey,
    getSelectionInlineStyle,
} from 'draftjs-utils';

import { ChangeTypes } from '@/constants/ChangeTypes';

export {
    getSelectedBlocksType,
    getSelectionInlineStyle,
    getSelectionEntityKey,
};

export const getSelectionRect = (selected: Selection): DOMRect => {
    const boundingClientRect = selected
        .getRangeAt(0)
        .getBoundingClientRect();

    return boundingClientRect?.top
        ? boundingClientRect
        : selected
            .getRangeAt(0)
            .getClientRects()[0];
};

export const getSelection = (root: Window): Selection | null => {
    if (root.getSelection) {
        return root.getSelection();
    }

    if (root.document.getSelection) {
        return root.document.getSelection();
    }

    return null;
};

export const getSelectionEntity = (editorState: EditorState): EntityInstance | null => {
    const selectionEntityKey = getSelectionEntityKey(editorState);

    if (!selectionEntityKey) {
        return null;
    }

    return editorState
        .getCurrentContent()
        .getEntity(selectionEntityKey);
};

export const getSelectionEntityType = (editorState: EditorState): string => {
    const selectionEntity = getSelectionEntity(editorState);

    if (!selectionEntity) {
        return '';
    }

    return selectionEntity.getType();
};

export const getSelectionInlineStylesType = (editorState: EditorState): string[] => {
    const selectionInlineStyle = getSelectionInlineStyle(editorState);

    return Object
        .keys(selectionInlineStyle)
        .filter((item) => selectionInlineStyle[item]);
};

export const getSelectedBlockNode = (root: Window): HTMLElement | null => {
    const selection = getSelection(root);

    if (!selection?.anchorNode) {
        return null;
    }

    const node = selection
        ?.getRangeAt(0)
        ?.startContainer as HTMLElement;

    if (!node?.closest) {
        return null;
    }

    return node.closest('[data-offset-key]');
};

export const removeInlineStyles = (
    editorState: EditorState,
    inlineStyles: string[],
) => {
    const selection = editorState.getSelection();
    const nextContentState = inlineStyles
        .reduce((contentState, style) => Modifier.removeInlineStyle(
            contentState,
            selection,
            style,
        ), editorState.getCurrentContent());

    return EditorState.push(
        editorState,
        nextContentState,
        ChangeTypes.CHANGE_INLINE_STYLE,
    );
};

export const toggleAndRemoveInlineStyles = (
    editorState: EditorState,
    type: string,
    removeStyles: string[],
) => {
    const newState = RichUtils.toggleInlineStyle(editorState, type);
    return removeInlineStyles(newState, removeStyles);
};
