import React, {
    useRef,
    useMemo,
    useEffect,
    useCallback,
} from 'react';

import { addNewBlock } from '@/components/Editor/utils/blocks';
import type { BlockTypes } from '@/constants/BlockTypes';
import type { BlockToolbarButtonType } from '@/components/BlockToolbar';

import { useBlockToolbarPosition } from '../useBlockToolbarPosition';

import type { UseBlockToolbarType } from './types';

const useBlockToolbar: UseBlockToolbarType = ({
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
    } = useBlockToolbarPosition({
        editorState,
        isReadOnly,
        editorRef,
        toolbarRef,
    });

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
        ({ type }: { type: string; }) => {
            setEditorState(addNewBlock(
                editorState,
                type as BlockTypes,
            ));

            setEditorFocus();
        },
        [
            editorState,
            setEditorFocus,
            setEditorState,
        ],
    );

    const renderBlock = useMemo(
        () => render({
            onClick: handleChange,
            buttons: Object.keys(blockRenderMap).map((blockType) => {
                const block = blockRenderMap[blockType];

                return {
                    type: blockType,
                    label: block.label,
                    title: block.title,
                };
            }) as BlockToolbarButtonType[],
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

export default useBlockToolbar;
