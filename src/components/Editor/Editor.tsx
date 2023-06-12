import type {
    FC,
    KeyboardEvent,
} from 'react';

import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { Map } from 'immutable';

import type {
    ContentBlock,
    DraftEditorCommand,
    DraftHandleValue,
} from 'draft-js';

import {
    ContentState,
    convertFromRaw,
    convertToRaw,
    DefaultDraftBlockRenderMap,
    Editor as DraftEditor,
    EditorState,
    KeyBindingUtil,
    Modifier,
    RichUtils,
} from 'draft-js';

import { ChangeTypes } from '@/constants/ChangeTypes';
import { BlockTypes } from '@/constants/BlockTypes';
import { KeyCommands } from '@/constants/KeyCommands';
import { HandledTypes } from '@/constants/HandledTypes';
import { ShortcutKeys } from '@/constants/ShortcutKeys';

import {
    addNewBlockAt,
    getBlockType,
    getCurrentBlock,
    getNextBlock,
    getPrevBlock,
    removeBlock,
    resetBlockWithType,
} from '@/components/Editor/utils/blocks';

import InlineToolbar from '@/components/InlineToolbar';
import BlockToolbar from '@/components/BlockToolbar';

import { useBlockToolbar } from './hooks/useBlockToolbar';
import { useInlineToolbar } from './hooks/useInlineToolbar';
import { Context as EditorContext } from './hooks/useEditor';

import { withBlockAdapter } from './hocs/withBlockAdapter';
import { withContentAdapter } from './hocs/withContentAdapter';
import { withCustomTheme } from './hocs/withCustomTheme';

import ContainerStyled from './styled/Container';
import PlaceholderStyled from './styled/Placeholder';

import { customBlockStyleRenderMap } from './customBlockStyleRenderMap';
import { customInlineStyleMap } from './customInlineStyleMap';
import { customEntityMap } from './customEntityMap';

import { EDITOR_ROOT_CLASSNAME } from './constants';

import decorators from './decorators';

import type { EditorPropsType } from './types';

export const Editor: FC<EditorPropsType> = ({
    isDisabled = false,
    isAutoFocus = false,
    isShowBlockToolbar = true,
    maxHeight,
    placeholder = 'Начните вводить текст',
    content = {
        blocks: [],
        entityMap: {},
    },
    inlineStyleMap = {},
    blockStyleRenderMap = {},
    blockRenderMap = {},
    entityMap = {},
    onChange = () => {},
    inlineToolbarAvailableButtons = [],
    renderInlineToolbar = ({
        selectedButtons,
        availableButtons,
        onToggle,
    }) => (
      <InlineToolbar
        availableButtons={availableButtons}
        selectedButtons={selectedButtons}
        onToggle={onToggle}
      />
    ),
    renderBlockToolbar = ({
        onClick,
        buttons,
    }) => (
      <BlockToolbar
        buttons={buttons}
        onClick={onClick}
      />
    ),
}) => {
    const editorRef = useRef<DraftEditor>(null);
    const [isReadOnly, setReadOnly] = useState(isDisabled);
    const [hasBlock, setHasBlock] = useState(false);

    const blockKeys = useMemo<string[]>(
        () => Object.keys(blockRenderMap),
        [
            blockRenderMap,
        ],
    );

    const mergeInlineStyleMap = useMemo(
        () => ({
            ...customInlineStyleMap,
            ...inlineStyleMap,
        }),
        [
            inlineStyleMap,
        ],
    );

    const mergeEntityMap = useMemo(
        () => ({
            ...customEntityMap,
            ...entityMap,
        }),
        [
            entityMap,
        ],
    );

    const mergeStyleBlockRenderMap = useMemo(
        () => DefaultDraftBlockRenderMap.merge(Map({
            ...customBlockStyleRenderMap,
            ...blockStyleRenderMap,
        })),
        [
            blockStyleRenderMap,
        ],
    );

    const [editorState, setEditorState] = useState(() => {
        const contentState = convertFromRaw(content);
        return EditorState.createWithContent(contentState, decorators);
    });

    const customBlocks = useMemo(
        () => Object
            .keys(blockRenderMap)
            ?.map((blockType) => ({
                type: blockType,
                component: withBlockAdapter(blockRenderMap[blockType], {
                    isDisabled,
                    blockType,
                }),
                editable: false,
            })),
        [
            blockRenderMap,
            isDisabled,
        ],
    );

    const blockRenderer = useCallback(
        (block: ContentBlock) => customBlocks
            .find((customBlock) => customBlock.type === block.getType()),
        [
            customBlocks,
        ],
    );

    const toggleHasBlock = useCallback(
        (newEditorState: EditorState) => {
            const currentBlockType = getBlockType(newEditorState);
            setHasBlock(currentBlockType !== BlockTypes.UNSTYLED);
        },
        [
            setHasBlock,
        ],
    );

    const handleChangeState = useCallback(
        (newEditorState: EditorState) => {
            toggleHasBlock(newEditorState);
            setEditorState(newEditorState);

            if (onChange) {
                const currentContent = newEditorState.getCurrentContent();
                onChange(convertToRaw(currentContent));
            }
        },
        [
            onChange,
            toggleHasBlock,
        ],
    );

    const handlePastedText = useCallback(
        (text: string): DraftHandleValue => {
            const textState = ContentState.createFromText(text);

            const newState = Modifier.replaceWithFragment(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                textState.getBlockMap(),
            );

            const newEditorState = EditorState.push(
                editorState,
                newState,
                ChangeTypes.INSERT_FRAGMENT,
            );

            handleChangeState(newEditorState);

            return HandledTypes.HANDLED;
        },
        [
            editorState,
            handleChangeState,
        ],
    );

    const handleKeyCommand = useCallback(
        (command: DraftEditorCommand) => {
            const currentBlock = getCurrentBlock(editorState);

            if (command === KeyCommands.DELETE) {
                const nextBlock = getNextBlock(editorState);

                const endOffset = editorState
                    .getSelection()
                    .getEndOffset();

                if (
                    currentBlock.getLength() === endOffset
                    && blockKeys.includes(nextBlock?.getType() as string)
                    && nextBlock
                ) {
                    handleChangeState(removeBlock(editorState, nextBlock));
                    return HandledTypes.HANDLED;
                }
            }

            if (
                command === KeyCommands.BACKSPACE
                && currentBlock.getType() === BlockTypes.UNSTYLED
            ) {
                const prevBlock = getPrevBlock(editorState);

                const startOffset = editorState
                    .getSelection()
                    .getStartOffset();

                if (
                    (currentBlock.getLength() === 0 || startOffset === 0)
                    && prevBlock
                    && blockKeys.includes(prevBlock?.getType())
                ) {
                    handleChangeState(removeBlock(editorState, prevBlock));
                    return HandledTypes.HANDLED;
                }
            }

            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                handleChangeState(newState);
                return HandledTypes.HANDLED;
            }

            return HandledTypes.NOT_HANDLED;
        },
        [
            blockKeys,
            editorState,
            handleChangeState,
        ],
    );

    const handleReturn = useCallback(
        (e: KeyboardEvent) => {
            if (KeyBindingUtil.isSoftNewlineEvent(e)) {
                handleChangeState(RichUtils.insertSoftNewline(editorState));
                return HandledTypes.HANDLED;
            }

            const currentBlock = getCurrentBlock(editorState);
            const blockType = currentBlock.getType();

            if (!e.altKey && !e.metaKey && !e.ctrlKey) {
                if (currentBlock.getLength() === 0) {
                    switch (blockType) {
                        case BlockTypes.UL:
                        case BlockTypes.OL:
                        case BlockTypes.BLOCKQUOTE:
                        case BlockTypes.CONCLUSION:
                        case BlockTypes.H1:
                        case BlockTypes.H2:
                        case BlockTypes.H3:
                        case BlockTypes.H4:
                        case BlockTypes.H5:
                        case BlockTypes.H6: {
                            handleChangeState(
                                resetBlockWithType(editorState, BlockTypes.UNSTYLED),
                            );

                            return HandledTypes.HANDLED;
                        }
                        default: {
                            return HandledTypes.NOT_HANDLED;
                        }
                    }
                } else {
                    const selection = editorState.getSelection();

                    const continuousBlocks = [
                        BlockTypes.BLOCKQUOTE,
                        BlockTypes.CONCLUSION,
                        BlockTypes.H1,
                        BlockTypes.H2,
                        BlockTypes.H3,
                        BlockTypes.H4,
                        BlockTypes.H5,
                        BlockTypes.H6,
                    ];

                    if (
                        selection.isCollapsed()
                        && currentBlock.getLength() === selection.getStartOffset()
                        && continuousBlocks.includes(blockType as BlockTypes)
                    ) {
                        handleChangeState(
                            addNewBlockAt(editorState, currentBlock.getKey()),
                        );

                        return HandledTypes.HANDLED;
                    }

                    return HandledTypes.NOT_HANDLED;
                }
            }

            return HandledTypes.NOT_HANDLED;
        },
        [
            editorState,
            handleChangeState,
        ],
    );

    const handleBeforeInput = useCallback(
        () => {
            const block = getCurrentBlock(editorState);
            const blockType = block.getType();

            if (blockType !== BlockTypes.UNSTYLED) {
                return HandledTypes.NOT_HANDLED;
            }

            const exec = /^(?<key>[0-9#*>\-=. ]{0,6})(?<text>.*)/s.exec(block.getText());
            const stringToTypeMapKey = exec?.groups?.key as keyof typeof ShortcutKeys;
            const blockTo = ShortcutKeys[stringToTypeMapKey];

            if (!blockTo || blockType !== BlockTypes.UNSTYLED) {
                return HandledTypes.NOT_HANDLED;
            }

            const newEditorState = resetBlockWithType(
                editorState,
                blockTo,
                { text: exec?.groups?.text as string },
            );

            handleChangeState(newEditorState);

            return HandledTypes.HANDLED;
        },
        [
            editorState,
            handleChangeState,
        ],
    );

    const setEditorFocus = useCallback(
        () => {
            if (!editorRef?.current) {
                return;
            }

            setTimeout(() => {
                editorRef?.current?.focus();
            }, 0);
        },
        [
            editorRef,
        ],
    );

    const inlineToolbar = useInlineToolbar({
        editorRef,
        isReadOnly,
        editorState,
        setEditorFocus,
        blockKeys,
        availableButtons: inlineToolbarAvailableButtons,
        setEditorState: handleChangeState,
        render: renderInlineToolbar,
    });

    const blockToolbar = useBlockToolbar({
        editorRef,
        isReadOnly: isReadOnly || !isShowBlockToolbar,
        editorState,
        setEditorFocus,
        blockRenderMap,
        setEditorState: handleChangeState,
        render: renderBlockToolbar,
    });

    const editorHookValue = useMemo(
        () => ({
            isReadOnly,
            isDisabled,
            setReadOnly,
            editorState,
            editorRef,
            setEditorFocus,
            handleChangeState,
            mergeEntityMap,
        }),
        [
            setEditorFocus,
            editorState,
            handleChangeState,
            isReadOnly,
            isDisabled,
            mergeEntityMap,
        ],
    );

    useEffect(
        () => {
            if (!isAutoFocus) {
                return;
            }

            editorRef.current?.focus();
        },
        [
            isAutoFocus,
        ],
    );

    useEffect(
        () => {
            setReadOnly(isDisabled);
        },
        [
            isDisabled,
        ],
    );

    return (
      <EditorContext.Provider value={editorHookValue}>
        <ContainerStyled
          className={EDITOR_ROOT_CLASSNAME}
          maxHeight={maxHeight}
          isShowAside={blockKeys?.length > 0 && !isDisabled && isShowBlockToolbar}
        >
          <PlaceholderStyled isShow={!hasBlock}>
            <DraftEditor
              ref={editorRef}
              placeholder={placeholder}
              readOnly={isReadOnly}
              editorState={editorState}
              blockRendererFn={blockRenderer}
              customStyleMap={mergeInlineStyleMap}
              blockRenderMap={mergeStyleBlockRenderMap}
              handleReturn={handleReturn}
              handlePastedText={handlePastedText}
              handleKeyCommand={handleKeyCommand}
              handleBeforeInput={handleBeforeInput}
              onChange={handleChangeState}
            />

            {inlineToolbar}

            {blockKeys?.length > 0 && blockToolbar}
          </PlaceholderStyled>
        </ContainerStyled>
      </EditorContext.Provider>
    );
};

export default memo(
    withCustomTheme(withContentAdapter(Editor)),
);
