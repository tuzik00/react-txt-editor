import type { FC } from 'react';
import React from 'react';
import Box from '@mui/material/Box';

import {
    IconAdd,
    IconDelete,
} from '@/components/Icons';

import Dropdown from '../Dropdown';

const Demo: FC = () => (
  <Box sx={{ p: 5 }}>
    <Dropdown
      items={[
                {
                    title: 'Добавить',
                    icon: <IconAdd />,
                    action: () => {},
                }, {
                    title: 'Удалить',
                    icon: <IconDelete />,
                    action: () => {},
                },
            ]}
    >
      <div>
        {'Button'}
      </div>
    </Dropdown>
  </Box>
);

export {
    Demo,
};

export default {
    title: 'Components/Dropdown',
};
