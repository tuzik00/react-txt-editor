import type { FC } from 'react';

import React, {
    useCallback,
} from 'react';

import Box from '@mui/material/Box';

import type { EditorBlockConfigSetupElementPropsType } from '../..';
import type { ElementDataType } from './types';

import YoutubeSelect from './YoutubeSelect';

const SetupElement: FC<EditorBlockConfigSetupElementPropsType<ElementDataType>> = ({
    data,
    onCreate,
}) => {
    const handleYoutubeIdSelect = useCallback(
        (youtubeId: string) => {
            onCreate({
                id: youtubeId,
                title: '',
            });
        },
        [
            onCreate,
        ],
    );

    return (
      <Box>
        <YoutubeSelect
          defaultYoutubeId={data.id}
          onSelect={handleYoutubeIdSelect}
        />
      </Box>
    );
};

export default SetupElement;
