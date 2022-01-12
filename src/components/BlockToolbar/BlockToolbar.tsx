import React, {
  FC,
  memo,
  useState,
  useMemo,
} from 'react';

import OutsideClickHandler from 'react-outside-click-handler';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

import { Modal, useModal } from '@/components/Modal';

import type { BlockConfigType } from './hooks/useBlockToolbar/types';
import type { BlockToolbarPropsType } from './types';

const BlockToolbar: FC<BlockToolbarPropsType> = ({
  onAdd,
  blocks,
}) => {
  const [isOpenToolbar, setOpenToolbar] = useState(false);

  const [showModal] = useModal<BlockConfigType>(({
    isOpen,
    onClose,
    data,
  }) => (
    <Modal
      isOpen={isOpen}
      title={data.label}
      onOutsideClick={onClose}
    >
      {data?.setupElement ? data.setupElement({
        onCreate: (blockData) => {
          onAdd({
            type: data.type as string,
            data: blockData,
          });

          onClose();
        },
        data: {},
      }) : null}
    </Modal>
  ));

  const renderButtons = useMemo(
    () => (
      <>
        <Divider
          orientation={'vertical'}
          variant={'middle'}
          flexItem
        />
        {blocks.map((block) => (
          <Tooltip
            key={block.type}
            title={block.label}
          >
            <IconButton
              key={block.type}
              size={'large'}
              onClick={() => {
                if (block?.setupElement) {
                  showModal({
                    ...block,
                  });
                } else {
                  onAdd({
                    type: block.type as string,
                    data: {},
                  });
                }
              }}
            >
              {block.toolbarIcon}
            </IconButton>
          </Tooltip>
        ))}
      </>
    ),
    [
      blocks,
      onAdd,
      showModal,
    ],
  );

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpenToolbar(false);
      }}
    >
      <Box
        sx={{
          display: 'flex',
          bgcolor: 'background.paper',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
        }}
      >
        <IconButton
          size={'large'}
          onClick={() => {
            setOpenToolbar(!isOpenToolbar);
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        {isOpenToolbar && renderButtons}
      </Box>
    </OutsideClickHandler>
  );
};

export default memo(BlockToolbar);
