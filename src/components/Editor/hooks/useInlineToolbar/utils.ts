import type { EditorState } from 'draft-js';

import type { UseInlineToolbarPositionType } from '../useInlineToolbarPosition/types';

export const resetStyles = (ref: HTMLDivElement): void => {
    ref.style.position = 'auto';
    ref.style.bottom = 'auto';
    ref.style.top = 'auto';
    ref.style.transform = 'auto';
};

export const setDesktopOffset = (
    ref: HTMLDivElement,
    position: UseInlineToolbarPositionType,
): void => {
    resetStyles(ref);

    ref.style.transition = '.2s all';
    ref.style.position = 'absolute';
    ref.style.zIndex = '1';
    ref.style.left = `${position.left}px`;
    ref.style.top = `${position.top}px`;
};

export const setMobileOffset = (ref: HTMLDivElement): void => {
    resetStyles(ref);

    ref.style.transition = '.2s all';
    ref.style.position = 'fixed';
    ref.style.zIndex = '1';
    ref.style.left = '0px';
    ref.style.bottom = '0px';
};

export const getSelectionContentSize = (editorState: EditorState): number => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);

    return selectedText.length;
};
