import type { FC } from 'react';

import React, {
    useState,
} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import BlockPopup from '../BlockPopup';

const Demo: FC = () => {
    const [isShow, setShow] = useState(true);

    return (
      <Box
        sx={{
                p: 8,
                height: 400,
            }}
      >
        <Box sx={{ mb: 2 }}>
          <Button
            variant={'outlined'}
            onClick={() => {
                        setShow(!isShow);
                    }}
          >
            {'Скрыть/Показать'}
          </Button>
        </Box>

        <BlockPopup
          isOpen={isShow}
          content={(
            <div>
              {'Content'}
            </div>
                )}
        >
          <Box
            sx={{
                        height: 400,
                        width: '100%',
                        border: '1px dashed #ccc',
                    }}
          />
        </BlockPopup>
      </Box>
    );
};

export {
    Demo,
};

export default {
    title: 'Components/BlockPopup',
};
