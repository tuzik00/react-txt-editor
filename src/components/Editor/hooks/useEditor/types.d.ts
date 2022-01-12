import { RefObject } from 'react';
import { Editor, EditorState } from 'draft-js';

export type UseEditorContextType = {
  setEditorFocus: () => void;
  editorRef?: RefObject<Editor>;
  editorState: EditorState;
  handleChangeState: (editorState: EditorState) => void;
  setReadOnly: (isReadonly: boolean) => void;
  isReadOnly: boolean;
};

export type UseEditorResultType = {
  editorRef?: RefObject<Editor>;
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  setEditorFocus: () => void;
  setReadOnly: (isReadonly: boolean) => void;
  isReadOnly: boolean;
};

export type UseEditorType = () => UseEditorResultType;
