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
    <div style={{ position: 'relative', padding: '150px' }}>
      <div>
        <div>
          <Editor
            state={initState}
            blockRenderMap={blockRenderMap}
            onChange={(data) => {
              setState(data);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypeBlock;
