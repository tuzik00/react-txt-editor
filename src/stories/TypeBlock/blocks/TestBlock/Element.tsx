import React, { FC, memo } from 'react';
import Box from '@mui/material/Box';

import type { ElementPropsType } from './types';

const Element: FC<ElementPropsType> = ({
  text,
  isReadonly = false,
}) => (
  <Box
    sx={{ p: 2 }}
    style={{ borderRadius: 3, border: `1px solid ${isReadonly ? 'red' : 'gray'}` }}
  >
    {text}
  </Box>
);

export default memo(Element);
