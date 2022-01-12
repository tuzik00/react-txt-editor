import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';

import {
  getSelectedBlockNode,
  getSelectedBlocksType,
} from '@/utils/selection';

import { BlockTypes } from '@/constants/BlockTypes';

import {
  TOOLBAR_OFFSET_LEFT,
  TOOLBAR_OFFSET_TOP,
} from './constants';

import type { BlockToolbarUseControlType } from './types';

const useControl: BlockToolbarUseControlType = (
  editorState,
  isReadOnly,
) => {
  const targetRef = useRef<HTMLElement | null>();
  const parentTargetRef = useRef<HTMLElement | null>();

  const [topPosition, setTopPosition] = useState(0);
  const [isVisible, setVisible] = useState(false);

  const setTop = useCallback(
    () => {
      targetRef.current = getSelectedBlockNode(window);
      parentTargetRef.current = targetRef.current
        ?.closest('.DraftEditor-root') as HTMLElement;

      if (!targetRef.current || !parentTargetRef.current) {
        return;
      }

      const targetBoundingRect = targetRef.current.getBoundingClientRect();
      const parentTargetBoundingRect = parentTargetRef.current.getBoundingClientRect();

      const top = (
        targetBoundingRect.top
        - parentTargetBoundingRect.top
        - TOOLBAR_OFFSET_TOP
      );

      setTopPosition(top);
    },
    [],
  );

  useEffect(
    () => {
      const selectionState = editorState.getSelection();
      const anchorKey = selectionState.getAnchorKey();
      const contentState = editorState.getCurrentContent();
      const blockForKey = contentState.getBlockForKey(anchorKey);
      const blockType = getSelectedBlocksType(editorState);

      if (
        isReadOnly
        || !selectionState.isCollapsed()
        || anchorKey !== selectionState.getFocusKey()
        || blockForKey.getLength() > 0
        || blockType !== BlockTypes.UNSTYLED
      ) {
        if (isVisible) {
          setVisible(false);
        }

        return;
      }

      if (!isVisible) {
        setVisible(true);
      }

      setTop();
    },
    [
      editorState,
      isVisible,
      isReadOnly,
      setTop,
    ],
  );

  return useMemo(
    () => ({
      isVisible,
      position: {
        top: topPosition,
        left: TOOLBAR_OFFSET_LEFT,
      },
    }),
    [
      isVisible,
      topPosition,
    ],
  );
};

export default useControl;
