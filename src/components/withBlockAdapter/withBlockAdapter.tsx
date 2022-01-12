import React, {
  FC,
  memo,
  useMemo,
  useCallback,
  FocusEvent,
} from 'react';

import { Map } from 'immutable';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import { useEditor } from '@/components/Editor/hooks/useEditor';
import { BlockOptions } from '@/components/BlockOptions';
import { Modal, useModal } from '@/components/Modal';
import { removeBlock, setBlockData } from '@/utils/blocks';
import { DISABLED_EDITOR_FIELDS } from './constants';

import type { WithBlockAdapterType, WrapperPropsType } from './types';

export const withBlockAdapter: WithBlockAdapterType = ({
  label,
  element,
  setupElement,
  isEditable,
}, {
  isActive,
}) => {
  const Wrapper: FC<WrapperPropsType> = ({ block }) => {
    const blockData = block?.getData()?.toJS() as Record<string, unknown>;

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

    const handleSetBlockData = useCallback(
      (data) => {
        const newEditorState = setBlockData(
          editorState,
          block,
          data as Map<string, unknown>,
        );

        setEditorState(newEditorState);
      },
      [
        block,
        editorState,
        setEditorState,
      ],
    );

    const render = useMemo(
      () => element({
        data: blockData,
        setData: handleSetBlockData,
        isReadonly: !isActive,
      }),
      [
        handleSetBlockData,
        blockData,
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

    const [showModal] = useModal(({
      isOpen,
      onClose,
    }) => (
      <Modal
        isOpen={isOpen}
        title={label}
        onOutsideClick={onClose}
      >
        {setupElement ? setupElement({
          onCreate: (params) => {
            handleSetBlockData(params);
            onClose();
          },
          data: blockData,
        }) : null}
      </Modal>
    ));

    const menuList = useMemo(
      () => {
        const menu = [
          {
            title: 'Удалить',
            icon: <DeleteOutlineIcon />,
            action: handleRemoveBlock,
          },
        ];

        if (isEditable && setupElement) {
          menu.push({
              title: 'Изменить',
              icon: <EditIcon />,
              action: showModal,
          });
        }

        return menu;
      },
      [
        handleRemoveBlock,
        showModal,
      ],
    );

    return (
      <div
        onFocus={handleDeactivateEditor}
        onBlur={handleActivateEditor}
      >
        { isActive ? (
          <BlockOptions menuList={menuList}>
            {render}
          </BlockOptions>
        ) : render}
      </div>
    );
  };

  return memo(Wrapper);
};
