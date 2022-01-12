import { RefObject } from 'react';
import { EditorState } from 'draft-js';

export interface InlineToolbarPositionType {
  left: number;
  top: number;
}

export type InlineToolbarUsePositionType = (
  editorState: EditorState,
  ref: RefObject<HTMLElement>,
) => InlineToolbarPositionType;
