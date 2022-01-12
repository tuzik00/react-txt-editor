import React, { FC, memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import type { ModalPropsType } from './types';

const Modal: FC<ModalPropsType> = ({
    children,
    isOpen,
    title,
    onOutsideClick,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      aria-labelledby={'responsive-dialog-title'}
      onClose={onOutsideClick}
    >
      <DialogTitle id={'responsive-dialog-title'}>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default memo(Modal);
