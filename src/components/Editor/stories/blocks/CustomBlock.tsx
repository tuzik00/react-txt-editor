import type { FC } from 'react';

import React, {
    useState,
} from 'react';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import type {
    EditorBlockConfigSetupElementPropsType,
    EditorBlockConfigElementPropsType,
} from '../..';

interface CustomBlockDataType {
    text: string;
}

const Element: FC<EditorBlockConfigElementPropsType<CustomBlockDataType>> = ({
    data,
}) => (
  <Paper
    elevation={3}
    sx={{ maxWidth: 400 }}
  >
    <Box sx={{ p: 3 }}>
      {'Ваш текст -'}
      {' '}

      {data.text}
    </Box>
  </Paper>
);

const SetupElement: FC<EditorBlockConfigSetupElementPropsType<CustomBlockDataType>> = ({
    onCreate,
}) => {
    const [value, setValue] = useState('');

    return (
      <Paper
        elevation={3}
        sx={{ maxWidth: 400 }}
      >
        <Box sx={{ p: 3 }}>
          <TextField
            fullWidth
            placeholder={'Введите текс'}
            onChange={(e) => {
                        setValue(e.target.value);
                    }}
          />

          <Box sx={{ mt: 2 }}>
            <Button
              variant={'contained'}
              onClick={() => {
                            onCreate({
                                text: value,
                            });
                        }}
            >
              {'Создать'}
            </Button>
          </Box>
        </Box>
      </Paper>
    );
};

export default {
    title: 'Пользовательский блок',
    label: 'Пользовательский блок',
    element: Element,
    setupElement: SetupElement,
};
