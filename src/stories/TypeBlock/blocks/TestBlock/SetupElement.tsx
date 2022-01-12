import React, {
  FC,
  memo,
  useState,
} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import type { SetupElementPropsType } from './types';

const SetupElement: FC<SetupElementPropsType> = ({
  text,
  onCreate = () => {},
}) => {
  const [val, setVal] = useState('');

  return (
    <div>
      <TextField
        size={'small'}
        defaultValue={text}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
&nbsp;
      <Button
        variant={'contained'}
        onClick={() => {
          onCreate(val);
        }}
      >
        {'Create'}
      </Button>
    </div>
  );
};

export default memo(SetupElement);
