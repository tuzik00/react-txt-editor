import type { FC } from 'react';
import React from 'react';

import Box from '@mui/material/Box';

import BlockToolbar from '../BlockToolbar';
import mock from './mock';

const Demo: FC = () => (
  <Box sx={{ p: 5 }}>
    <BlockToolbar buttons={mock} />
  </Box>
);

export {
    Demo,
};

export default {
    title: 'Components/BlockToolbar',
};
