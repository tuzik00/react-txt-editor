import React from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';

import {
    IconReplace,
    IconDelete,
} from '@/components/Icons';

import ContextMenu from '../ContextMenu';

const Demo: FC = () => (
  <Box
    sx={{
            p: 8,
            height: 400,
        }}
  >
    <ContextMenu
      itemsList={[
                {
                    icon: <IconReplace />,
                    title: 'Заменить',
                    action: () => {},
                },
                {
                    icon: <IconDelete />,
                    title: 'Удалить',
                    action: () => {},
                },
            ]}
    >
      <Box
        sx={{
                    height: 400,
                    width: '100%',
                    border: '1px dashed #ccc',
                }}
      />
    </ContextMenu>
  </Box>
);

export {
    Demo,
};

export default {
    title: 'Components/ContextMenu',
};
