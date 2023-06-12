import type {
    FC,
    FocusEvent,
} from 'react';

import React, {
    memo,
    useMemo,
    useState,
    useCallback,
} from 'react';

import isEmpty from 'lodash/isEmpty';
import type { Map } from 'immutable';

import { IconDelete } from '@/components/Icons';

import { useEditor } from '@/components/Editor/hooks/useEditor';
import type { BlockTypes } from '@/constants/BlockTypes';

import BlockOptions from '@/components/BlockOptions';

import {
    addNewBlock,
    removeBlock,
    setBlockData,
} from '@/components/Editor/utils/blocks';

import { DISABLED_EDITOR_FIELDS } from './constants';

import type {
    WithBlockAdapterType,
    WrapperPropsType,
} from './types';

export const withBlockAdapter: WithBlockAdapterType = ({
    element,
    setupElement,
}, {
    isDisabled,
    blockType,
}) => {
    const Wrapper: FC<WrapperPropsType> = ({ block }) => {
        const blockData = block?.getData()?.toJS() as Record<string, unknown>;
        const [isShowSetup, setShowSetup] = useState(isEmpty(blockData) && !!setupElement);

        const {
            editorState,
            setReadOnly,
            setEditorState,
        } = useEditor();

        const handleRemoveBlock = useCallback(
            () => {
                setEditorState(removeBlock(editorState, block));
            },
            [
                editorState,
                setEditorState,
                block,
            ],
        );

        const handleCreate = useCallback(
            (params: Map<string, unknown>) => {
                setShowSetup(false);

                setEditorState(
                    addNewBlock(
                        setBlockData(
                            editorState,
                            block,
                            params,
                        ),
                        blockType as BlockTypes,
                        params,
                    ),
                );
            },
            [
                block,
                editorState,
                setEditorState,
            ],
        );

        const handleSetBlockData = useCallback(
            (data: Map<string, unknown>) => {
                // Проверка, если нет setup блока
                if (isEmpty(blockData) && !setupElement) {
                    handleCreate(data);
                }

                const newEditorState = setBlockData(
                    editorState,
                    block,
                    data,
                );

                setEditorState(newEditorState);
            },
            [
                block,
                blockData,
                editorState,
                handleCreate,
                setEditorState,
            ],
        );

        const render = useMemo(
            () => {
                if (setupElement && isShowSetup) {
                    const SetupElement = setupElement;

                    return (
                      <SetupElement
                        data={blockData}
                        editorState={editorState}
                        setEditorState={setEditorState}
                        onCreate={handleCreate}
                      />
                    );
                }

                if (!element) {
                    return null;
                }

                const Element = element;

                return (
                  <Element
                    data={blockData}
                    isDisabled={isDisabled}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    onUpdate={(params) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        handleSetBlockData(params);
                    }}
                    onShowSetupElement={() => {
                            setShowSetup(true);
                        }}
                  />
                );
            },
            [
                isShowSetup,
                blockData,
                editorState,
                setEditorState,
                handleCreate,
                handleSetBlockData,
            ],
        );

        const handleActivateEditor = useCallback(
            (e: FocusEvent<HTMLInputElement>) => {
                if (DISABLED_EDITOR_FIELDS.includes(e.target.tagName)) {
                    setReadOnly(false);
                }
            },
            [
                setReadOnly,
            ],
        );

        const handleDeactivateEditor = useCallback(
            (e: FocusEvent<HTMLInputElement>) => {
                if (DISABLED_EDITOR_FIELDS.includes(e.target.tagName)) {
                    setReadOnly(true);
                }
            },
            [
                setReadOnly,
            ],
        );

        const menuList = [
            {
                title: 'Удалить',
                icon: <IconDelete />,
                action: handleRemoveBlock,
            },
        ];

        if (!render) {
            return null;
        }

        return (
          <div
            onFocus={handleDeactivateEditor}
            onBlur={handleActivateEditor}
          >
            {!isDisabled ? (
              <BlockOptions itemsList={menuList}>
                {render}
              </BlockOptions>
                ) : render}
          </div>
        );
    };

    return memo(Wrapper);
};
