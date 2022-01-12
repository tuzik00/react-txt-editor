import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';

import {
  Editor,
  EditorStateType,
  StateTypes,
} from '../..';

import initState from './state';

const TypeMarkdownStory: FC = () => {
  const [state, setState] = useState<EditorStateType>();

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '100%' }}>
        <Editor
          state={initState}
          stateType={StateTypes.MARKDOWN}
          onChange={(data) => {
            setState(data as string);
          }}
        />
      </Box>
      <Box
        component={'pre'}
        style={{ whiteSpace: 'pre-wrap' }}
        sx={{ width: '100%' }}
      >
        {state}
      </Box>
    </Box>
  );
};

export default TypeMarkdownStory;
