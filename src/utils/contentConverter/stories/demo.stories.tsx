import type { FC } from 'react';

import React, {
    useState,
} from 'react';

import debounce from 'lodash/debounce';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { createContentBlock } from '../utils';
import draftToBlocks from '../draftToBlocks';
import mock from './mock';

const Demo: FC = () => {
    const [content, setContent] = useState(mock);

    return (
      <Box>
        <Box sx={{ display: 'flex', height: 700 }}>
          <TextField
            minRows={10}
            fullWidth
            multiline
            defaultValue={mock}
            onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                        setContent(e.target.value);
                    }, 200)}
          />

          <pre
            style={{
                        whiteSpace: 'pre-wrap',
                        width: '100%',
                        overflow: 'auto',
                    }}
          >
            {JSON.stringify(
                        createContentBlock(content),
                        null,
                        2,
                    )}
          </pre>

          <pre
            style={{
                        whiteSpace: 'pre-wrap',
                        width: '100%',
                        overflow: 'auto',
                    }}
          >
            {JSON.stringify(
                        draftToBlocks(createContentBlock(content), 'blocks'),
                        null,
                        2,
                    )}
          </pre>
        </Box>
      </Box>
    );
};

export {
    Demo,
};

export default {
    title: 'Utils/contentConverter',
};
