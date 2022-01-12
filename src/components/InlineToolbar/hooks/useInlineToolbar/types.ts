import { ReactElement, RefObject } from 'react';
import { EditorState, Editor } from 'draft-js';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';
import { BlockTypes } from '@/constants/BlockTypes';
import { EntityTypes } from '@/constants/EntityTypes';

import { ActionType } from './constants';

export type OnTogglePropsType = {
  type: EntityTypes | BlockTypes | InlineStyleTypes;
  actionType: ActionType;
  data?: Record<string, unknown>;
};

export type RenderPropsType = {
  onToggle?: (props: OnTogglePropsType) => void;
  allowTypes: AllowTypes;
  selection: string[];
};

export type RenderFnType = (props: RenderPropsType) => ReactElement;

export type UseInlineToolbarPropsType = {
  editorRef: RefObject<Editor>;
  blockKeys: string[];
  isReadOnly: boolean;
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  setEditorFocus: () => void;
  allowTypes: AllowTypes;
  render: RenderFnType;
};

export type UseInlineToolbarFnType = (props: UseInlineToolbarPropsType) => ReactElement | null;

export type AllowTypes = (EntityTypes | BlockTypes | InlineStyleTypes)[];
