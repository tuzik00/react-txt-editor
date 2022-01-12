import { Editor, EditorState } from 'draft-js';
import { ReactElement, RefObject } from 'react';

export interface BlockConfigType {
  label: string;
  type?: string;
  toolbarIcon: ReactElement;
  isEditable: boolean;
  element: (props: {
    data?: Record<string, unknown>,
    setData: (data: Record<string, unknown>) => void,
    isReadonly: boolean,
  }) => ReactElement;
  setupElement?: (
    props: {
      onCreate: (params?: Record<string, unknown>) => void,
      data?: Record<string, unknown>,
    },
  ) => ReactElement;
}

export type RenderPropsType = {
  onAdd: (props: {
    type: string;
    data?: Record<string, unknown>;
  }) => void;
  blocks: BlockConfigType[];
};

export type RenderFnType = (props: RenderPropsType) => ReactElement;

export type BlockRenderMapType = {
  [key: string]: BlockConfigType;
};

export type UseBlockToolbarPropsType = {
  editorRef: RefObject<Editor>;
  isReadOnly: boolean;
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  setEditorFocus: () => void;
  blockRenderMap: BlockRenderMapType;
  render: RenderFnType;
};

export type UseBlockToolbarFnType = (props: UseBlockToolbarPropsType) => ReactElement | null;
