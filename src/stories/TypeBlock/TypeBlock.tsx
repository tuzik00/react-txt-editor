import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';

import {
  Editor,
  EditorStateType,
} from '../..';

import { blockRenderMap } from './blockRenderMap';
import initState from './state';

const TypeBlock: FC = () => {
  const [state, setState] = useState<EditorStateType>([]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '100%' }}>
        <Editor
          state={initState}
          blockRenderMap={blockRenderMap}
          onChange={(data) => {
            setState(data);
          }}
        />
      </Box>
      <Box
        component={'pre'}
        style={{ whiteSpace: 'pre-wrap' }}
        sx={{ width: '100%' }}
      >
        {`${JSON.stringify(state as string, null, 2)}`}
      </Box>
    </Box>
  );
};

export default TypeBlock;
