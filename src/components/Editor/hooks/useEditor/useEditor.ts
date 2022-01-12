import { useContext } from 'react';
import context from './context';

import type { UseEditorType } from './types';

const useEditor: UseEditorType = () => {
  const {
    handleChangeState,
    editorState,
    editorRef,
    setReadOnly,
    isReadOnly,
    setEditorFocus,
  } = useContext(context);

  return {
    setEditorState: handleChangeState,
    setEditorFocus,
    setReadOnly,
    isReadOnly,
    editorState,
    editorRef,
  };
};

export default useEditor;
