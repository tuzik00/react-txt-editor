import { useContext } from 'react';

import context from './context';

import type { UseEditorType } from './types';

const useEditor: UseEditorType = () => {
    const {
        handleChangeState,
        editorState,
        editorRef,
        isDisabled,
        setReadOnly,
        isReadOnly,
        setEditorFocus,
        mergeEntityMap,
    } = useContext(context);

    return {
        setEditorState: handleChangeState,
        setEditorFocus,
        setReadOnly,
        isReadOnly,
        isDisabled,
        editorState,
        editorRef,
        mergeEntityMap,
    };
};

export default useEditor;
