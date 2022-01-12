import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import useModal from './useModal';
import Modal from '../Modal';

const useConfirm = ({
    title = '',
}) => useModal(({
    isOpen,
    onClose,
}) => (
  <Modal
    title={title}
    isOpen={isOpen}
    onOutsideClick={onClose}
  >
    <Box
      sx={{ mt: 1 }}
      textAlign={'right'}
    >
      <Button
        variant={'contained'}
        onClick={onClose}
      >
        {'Ок'}
      </Button>
    </Box>
  </Modal>
));

export default useConfirm;
