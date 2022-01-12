import { EditorState } from 'draft-js';
import { createContext } from 'react';
import type { UseEditorContextType } from './types';

export default createContext<UseEditorContextType>({
  editorState: EditorState.createEmpty(),
  setEditorFocus: () => {},
  handleChangeState: () => {},
  setReadOnly: () => {},
  isReadOnly: false,
});
