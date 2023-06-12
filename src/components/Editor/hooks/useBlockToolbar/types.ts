import type {
    Editor,
    EditorState,
} from 'draft-js';

import type {
    ReactElement,
    RefObject,
} from 'react';

import type { BlockToolbarButtonType } from '@/components/BlockToolbar';

import type { EditorBlockConfigMapType } from '../../types';

export type UseBlockToolbarRenderPropsType = {
    onClick: (props: BlockToolbarButtonType) => void;
    buttons: BlockToolbarButtonType[];
};

export type UseBlockToolbarPropsType = {
    editorRef: RefObject<Editor>;
    isReadOnly: boolean;
    editorState: EditorState;
    setEditorState: (state: EditorState) => void;
    setEditorFocus: () => void;
    blockRenderMap: EditorBlockConfigMapType;
    render: (props: UseBlockToolbarRenderPropsType) => ReactElement;
};

export type UseBlockToolbarType = (
    props: UseBlockToolbarPropsType,
) => ReactElement | null;
