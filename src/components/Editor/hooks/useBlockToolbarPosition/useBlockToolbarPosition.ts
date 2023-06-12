import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { BlockTypes } from '@/constants/BlockTypes';

import {
    getSelectedBlockNode,
    getSelectedBlocksType,
} from '../../utils/selection';

import { TOOLBAR_OFFSET_LEFT } from './constants';

import type { UseBlockToolbarPositionType } from './types';

const useBlockToolbarPosition: UseBlockToolbarPositionType = ({
    editorState,
    isReadOnly,
    toolbarRef,
}) => {
    const targetRef = useRef<HTMLElement | null>();

    const [topPosition, setTopPosition] = useState(-10);
    const [isVisible, setVisible] = useState(false);

    const setTop = useCallback(
        () => {
            targetRef.current = getSelectedBlockNode(window);
            const parrentElementRef = targetRef?.current
                ?.closest('[data-contents="true"] > *') as HTMLElement;

            if (!targetRef.current || !parrentElementRef) {
                return;
            }

            const relativeOffset = parrentElementRef.offsetTop
                + parrentElementRef.clientHeight / 2
                - (toolbarRef.current?.clientHeight || 0) / 2;

            setTopPosition(relativeOffset);
        },
        [
            toolbarRef,
        ],
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

export default useBlockToolbarPosition;
