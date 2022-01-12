import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { RichUtils } from 'draft-js';

import {
  getSelectedBlocksType,
  getSelectionEntityType,
  getSelectionInlineStylesType,
} from '@/utils/selection';

import { EntityTypes } from '@/constants/EntityTypes';
import { toggleEntityLink } from '@/utils/entity';
import { isCustomBlockType } from '@/utils/blocks';

import { usePosition } from '../usePosition';
import { ActionType } from './constants';

import type { UseInlineToolbarFnType } from './types';

export const useInlineToolbar: UseInlineToolbarFnType = ({
  render,
  isReadOnly,
  editorState,
  setEditorState,
  setEditorFocus,
  allowTypes = [],
  blockKeys,
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const position = usePosition(editorState, toolbarRef);

  useEffect(
    () => {
      if (!toolbarRef.current) {
        return;
      }

      toolbarRef.current.style.transition = '.2s all';
      toolbarRef.current.style.position = 'absolute';
      toolbarRef.current.style.zIndex = '1';
      toolbarRef.current.style.left = `${position.left}px`;
      toolbarRef.current.style.top = `${position.top}px`;
    },
    [
      toolbarRef,
      position,
    ],
  );

  const isVisible = useMemo(
    () => (
      !editorState.getSelection().isCollapsed()
      && !isCustomBlockType(editorState, blockKeys)
    ),
    [
      blockKeys,
      editorState,
    ],
  );

  const activeSelection = useMemo(
    () => [
      getSelectionEntityType(editorState),
      getSelectedBlocksType(editorState),
      ...getSelectionInlineStylesType(editorState),
    ].filter(Boolean),
    [
      editorState,
    ],
  );

  const handleChange = useCallback(
    ({
       actionType,
       type,
       data: { url } = { url: '' },
     }) => {
      switch (actionType) {
        case ActionType.INLINE:
          setEditorState(RichUtils.toggleInlineStyle(editorState, type as string));
          break;

        case ActionType.BLOCK:
          setEditorState(RichUtils.toggleBlockType(editorState, type as string));
          break;

        case ActionType.ENTITY: {
          if (type === EntityTypes.LINK) {
            setEditorState(toggleEntityLink(editorState, url));
          }

          break;
        }

        default:
          break;
      }

      setEditorFocus();
    },
    [
      setEditorFocus,
      setEditorState,
      editorState,
    ],
  );

  const renderContent = useMemo(
    () => render && render({
      selection: activeSelection,
      onToggle: handleChange,
      allowTypes,
    }),
    [
      render,
      activeSelection,
      handleChange,
      allowTypes,
    ],
  );

  return (
    <div
      ref={toolbarRef}
      hidden={!isVisible || isReadOnly}
    >
      {renderContent}
    </div>
  );
};
