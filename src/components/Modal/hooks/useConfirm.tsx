import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import useModal from './useModal';
import Modal from '../Modal';

import type {
    ModalDataType,
    UseConfirmPropsType,
} from '../types';

function useConfirm<DataType = unknown | ModalDataType>({
    title = 'Вы уверены?',
    onConfirm = () => {},
}: UseConfirmPropsType<DataType>) {
    return useModal<DataType>(({
        isOpen,
        onClose,
        data,
    }) => (
      <Modal
        title={title}
        isOpen={isOpen}
        onOutsideClick={onClose}
      >
        <Box
          sx={{ mt: 2 }}
          textAlign={'right'}
        >
          <Button
            variant={'outlined'}
            onClick={onClose}
          >
            {'Отмена'}
          </Button>
                &nbsp;&nbsp;
          <Button
            variant={'contained'}
            onClick={() => {
                        onConfirm(data);
                        onClose();
                    }}
          >
            {'Ок'}
          </Button>
        </Box>
      </Modal>
    ));
}

export default useConfirm;
