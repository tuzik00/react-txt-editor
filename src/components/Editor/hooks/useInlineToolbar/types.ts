import type {
    ReactElement,
    RefObject,
} from 'react';

import type {
    Editor,
    EditorState,
} from 'draft-js';

import type { EditorAllowTypes } from '../../types';

import type { ActionType } from './constants';

export interface OnToggleDataType {
    url?: string;
    file?: File;
}

export type OnTogglePropsType = {
    type: EditorAllowTypes;
    actionType: ActionType;
    data?: OnToggleDataType;
};

export type UseInlineToolbarRenderPropsType = {
    onToggle?: (props: OnTogglePropsType) => void;
    availableButtons: EditorAllowTypes[];
    selectedButtons: EditorAllowTypes[];
};

export type UseInlineToolbarPropsType = {
    editorRef: RefObject<Editor>;
    blockKeys: string[];
    isReadOnly: boolean;
    editorState: EditorState;
    setEditorState: (state: EditorState) => void;
    setEditorFocus: () => void;
    availableButtons: EditorAllowTypes[];
    render: (props: UseInlineToolbarRenderPropsType) => ReactElement;
};

export type UseInlineToolbarType = (
    props: UseInlineToolbarPropsType,
) => ReactElement | null;
