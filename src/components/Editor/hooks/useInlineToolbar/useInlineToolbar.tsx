import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';

import { RichUtils } from 'draft-js';
import { useTheme } from '@emotion/react';

import { useMediaQuery } from '@mui/material';
import type { ThemeOptions } from '@mui/material';

import { EntityTypes } from '@/constants/EntityTypes';
import { toggleEntityLink } from '@/components/Editor/utils/entity';
import { isCustomBlockType } from '@/components/Editor/utils/blocks';

import {
    getSelectedBlocksType,
    getSelectionEntityType,
    getSelectionInlineStylesType,
} from '../../utils/selection';

import type { EditorAllowTypes } from '../../types';
import { useInlineToolbarPosition } from '../useInlineToolbarPosition';

import { ActionType } from './constants';

import type {
    OnTogglePropsType,
    UseInlineToolbarType,
} from './types';

import {
    setMobileOffset,
    setDesktopOffset,
    getSelectionContentSize,
} from './utils';

import { WrapperStyled } from './styled';

const useInlineToolbar: UseInlineToolbarType = ({
    render,
    isReadOnly,
    editorState,
    setEditorState,
    setEditorFocus,
    availableButtons = [],
    blockKeys,
}) => {
    const toolbarRef = useRef<HTMLDivElement>(null);
    const position = useInlineToolbarPosition(editorState, toolbarRef);
    const theme = useTheme() as ThemeOptions;
    const isMobile = useMediaQuery(theme?.breakpoints?.down?.('tablet') || '');

    useEffect(
        () => {
            if (!toolbarRef.current) {
                return;
            }

            if (isMobile) {
                setMobileOffset(toolbarRef.current);
                return;
            }

            setDesktopOffset(toolbarRef.current, position);
        },
        [
            isMobile,
            toolbarRef,
            position,
        ],
    );

    const isVisible = useMemo(
        () => (
            !editorState.getSelection().isCollapsed()
                && !isCustomBlockType(editorState, blockKeys)
                && getSelectionContentSize(editorState) > 0
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
        ].filter(Boolean) as EditorAllowTypes[],
        [
            editorState,
        ],
    );

    const handleChange = useCallback(
        ({
            actionType,
            type,
            data: { url } = { url: '' },
        }: OnTogglePropsType) => {
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
            selectedButtons: activeSelection,
            onToggle: handleChange,
            availableButtons,
        }),
        [
            render,
            activeSelection,
            handleChange,
            availableButtons,
        ],
    );

    return (
      <WrapperStyled
        ref={toolbarRef}
        hidden={!isVisible || isReadOnly}
      >
        {renderContent}
      </WrapperStyled>
    );
};

export default useInlineToolbar;
