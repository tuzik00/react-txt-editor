import type { FC } from 'react';

import React, {
    useState,
} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { IconDelete } from '@/components/Icons';

import BlockOptions from '../BlockOptions';

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

        <BlockOptions
          isShow={isShow}
          itemsList={[
                    {
                        title: 'Удалить',
                        icon: <IconDelete />,
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
        </BlockOptions>
      </Box>
    );
};

export {
    Demo,
};

export default {
    title: 'Components/BlockOptions',
};
