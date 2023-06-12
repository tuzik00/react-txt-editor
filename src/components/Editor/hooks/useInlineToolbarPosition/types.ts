import type { RefObject } from 'react';
import type { EditorState } from 'draft-js';

export interface UseInlineToolbarPositionType {
  left: number;
  top: number;
}

export type UseInlineToolbarPositionPropsType = (
  editorState: EditorState,
  ref: RefObject<HTMLElement>,
) => UseInlineToolbarPositionType;
