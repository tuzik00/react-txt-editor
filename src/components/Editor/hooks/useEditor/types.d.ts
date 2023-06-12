import type {
    RefObject,
    Dispatch,
    SetStateAction,
} from 'react';

import type {
    Editor,
    EditorState,
} from 'draft-js';

import type { EntityMapType } from '../../types';

export type UseEditorContextType = {
    setEditorFocus: () => void;
    editorRef?: RefObject<Editor>;
    editorState: EditorState;
    handleChangeState: (editorState: EditorState) => void;
    setReadOnly: Dispatch<SetStateAction<boolean>>;
    isReadOnly: boolean;
    isDisabled: boolean;
    mergeEntityMap: EntityMapType;
};

export type UseEditorResultType = {
    editorRef?: RefObject<Editor>;
    editorState: EditorState;
    setEditorState: (editorState: EditorState) => void;
    setEditorFocus: () => void;
    setReadOnly: Dispatch<SetStateAction<boolean>>;
    isReadOnly: boolean;
    isDisabled: boolean;
    mergeEntityMap: EntityMapType;
};

export type UseEditorType = () => UseEditorResultType;
