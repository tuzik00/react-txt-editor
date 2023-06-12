import type {
    FC,
    ReactNode,
    ReactElement,
} from 'react';

import type {
    RawDraftContentState,
    EditorState,
} from 'draft-js';

import type { ThemeOptions } from '@mui/material';

import type { EntityTypes } from '@/constants/EntityTypes';
import type { BlockTypes } from '@/constants/BlockTypes';
import type { InlineStyleTypes } from '@/constants/InlineStyleTypes';

import type { UseInlineToolbarRenderPropsType } from './hooks/useInlineToolbar';
import type { UseBlockToolbarRenderPropsType } from './hooks/useBlockToolbar';

export type BlockStyleRenderConfigType<Props = Record<string, unknown>> = {
    element: (props: { children: ReactNode; } & Props) => ReactElement;
    wrapper?: ReactElement;
};

export type BlockStyleRenderMapType = {
    [BlockTypes.UNSTYLED]?: BlockStyleRenderConfigType;
    [BlockTypes.PARAGRAPH]?: BlockStyleRenderConfigType;
    [BlockTypes.OL]?: BlockStyleRenderConfigType;
    [BlockTypes.UL]?: BlockStyleRenderConfigType;
    [BlockTypes.H1]?: BlockStyleRenderConfigType;
    [BlockTypes.H2]?: BlockStyleRenderConfigType;
    [BlockTypes.H3]?: BlockStyleRenderConfigType;
    [BlockTypes.H4]?: BlockStyleRenderConfigType;
    [BlockTypes.H5]?: BlockStyleRenderConfigType;
    [BlockTypes.H6]?: BlockStyleRenderConfigType;
    [BlockTypes.BLOCKQUOTE]?: BlockStyleRenderConfigType;
    [BlockTypes.ATOMIC]?: BlockStyleRenderConfigType;
    [BlockTypes.CONCLUSION]?: BlockStyleRenderConfigType;
    [BlockTypes.YOUTUBE]?: BlockStyleRenderConfigType;
    [BlockTypes.IMAGE]?: BlockStyleRenderConfigType;
    [BlockTypes.HR]?: BlockStyleRenderConfigType;
};

export type InlineStyleMapType = {
    [InlineStyleTypes.BOLD]?: Record<string, string | number>;
    [InlineStyleTypes.ITALIC]?: Record<string, string | number>;
    [InlineStyleTypes.SUPERSCRIPT]?: Record<string, string | number>;
    [InlineStyleTypes.STRIKETHROUGH]?: Record<string, string | number>;
};

export type EntityMapType = {
    [EntityTypes.DIRECTIVE_LINK]?: FC<{
        href: string;
        title: string;
        classNames: string;
        id: string;
        variant: string;
        children: ReactNode;
    }>;
    [EntityTypes.LINK]?: FC<{
        href: string;
        title: string;
        children: ReactNode;
    }>;
};

export type EditorPropsType = {
    isDisabled?: boolean;
    isAutoFocus?: boolean;
    maxHeight?: number;
    isShowBlockToolbar?: boolean;
    placeholder?: string;
    content?: RawDraftContentState;
    onChange?: (blocks: RawDraftContentState) => void;
    entityMap?: EntityMapType;
    inlineStyleMap?: InlineStyleMapType;
    blockStyleRenderMap?: BlockStyleRenderMapType;
    blockRenderMap?: EditorBlockConfigMapType;
    inlineToolbarAvailableButtons?: EditorAllowTypes[];
    theme?: ThemeOptions;
    renderInlineToolbar?: (props: UseInlineToolbarRenderPropsType) => ReactElement;
    renderBlockToolbar?: (props: UseBlockToolbarRenderPropsType) => ReactElement;
};

export type EditorBlockConfigElementPropsType<Data = any, ExtendParams = unknown> = {
    data: Data;
    onUpdate: (data: Data) => void;
    onShowSetupElement: () => void;
    isDisabled: boolean;
    setEditorState?: (state: EditorState) => void;
    editorState?: EditorState;
} & ExtendParams;

export type EditorBlockConfigSetupElementPropsType<Data = any, ExtendParams = unknown> = {
    setEditorState?: (state: EditorState) => void;
    editorState?: EditorState;
    onCreate: (data: Data) => void;
    data: Data;
} & ExtendParams;

export type EditorBlockConfigType = {
    label: ReactNode;
    title?: string;
    element?: FC<EditorBlockConfigElementPropsType>;
    setupElement?: FC<EditorBlockConfigSetupElementPropsType>;
};

export type EditorBlockConfigMapType = {
    [key: string]: EditorBlockConfigType;
};

export type EditorAllowTypes = EntityTypes | BlockTypes | InlineStyleTypes;
