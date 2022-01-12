declare module 'draftjs-utils' {
  import { EditorState } from 'draft-js';

  export function getSelectionInlineStyle(editorState: EditorState): Record<string, unknown>;

  export function getSelectedBlocksType(editorState: EditorState): string;

  export function getSelectionEntity(editorState: EditorState): string;

  export function insertNewUnstyledBlock(editorState: EditorState): EditorState;
}
