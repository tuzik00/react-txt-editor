import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';

import { addNewBlock } from '@/utils/blocks';
import { BlockTypes } from '@/constants/BlockTypes';
import { useControl } from '../useControl';

import type { UseBlockToolbarFnType } from './types';

export const useBlockToolbar: UseBlockToolbarFnType = ({
  editorRef,
  render,
  isReadOnly,
  editorState,
  setEditorState,
  setEditorFocus,
  blockRenderMap,
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  const {
    position,
    isVisible,
  } = useControl(
    editorState,
    isReadOnly,
    editorRef,
  );

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

  const handleChange = useCallback(
    ({ type, data }) => {
      setEditorState(addNewBlock(
        editorState,
        type as BlockTypes,
        data as Record<string, unknown>,
      ));
      setEditorFocus();
    },
    [
      editorState,
      setEditorState,
      setEditorFocus,
    ],
  );

  const renderBlock = useMemo(
    () => render({
      onAdd: handleChange,
      blocks: Object.keys(blockRenderMap).map((blockType) => ({
        ...blockRenderMap[blockType],
        type: blockType,
      })),
    }),
    [
      render,
      handleChange,
      blockRenderMap,
    ],
  );

  return (
    <div
      ref={toolbarRef}
      hidden={!isVisible || isReadOnly}
    >
      {renderBlock}
    </div>
  );
};
