import { RefObject } from 'react';
import { Editor, EditorState } from 'draft-js';

export interface BlockToolbarPositionType {
  left: number;
  top: number;
}

export interface BlockToolbarUseControlResultType {
  position: BlockToolbarPositionType;
  isVisible: boolean;
}

export type BlockToolbarUseControlType = (
  editorState: EditorState,
  isReadOnly: boolean,
  editorRef: RefObject<Editor>,
) => BlockToolbarUseControlResultType;
