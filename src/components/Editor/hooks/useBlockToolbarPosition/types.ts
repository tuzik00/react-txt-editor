import type { RefObject } from 'react';

import type {
    Editor,
    EditorState,
} from 'draft-js';

export interface UseBlockToolbarPosition {
  left: number;
  top: number;
}

export interface UseBlockToolbarPositionResultType {
  position: UseBlockToolbarPosition;
  isVisible: boolean;
}

export interface UseBlockToolbarPositionPropsType {
  editorState: EditorState;
  isReadOnly: boolean;
  editorRef: RefObject<Editor>;
  toolbarRef: RefObject<HTMLDivElement>;
}

export type UseBlockToolbarPositionType = (
  props: UseBlockToolbarPositionPropsType
) => UseBlockToolbarPositionResultType;
