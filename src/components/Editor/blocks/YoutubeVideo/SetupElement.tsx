import type { FC } from 'react';

import React, {
    useCallback,
} from 'react';

import Box from '@mui/material/Box';

import type { EditorBlockConfigSetupElementPropsType } from '../..';
import type { ElementPropsType } from './types';
import YoutubeSelect from './YoutubeSelect';

const SetupElement: FC<EditorBlockConfigSetupElementPropsType<ElementPropsType>> = ({
    data,
    onCreate,
}) => {
    const handleYoutubeIdSelect = useCallback(
        (youtubeId: string) => {
            onCreate({
                id: youtubeId,
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
