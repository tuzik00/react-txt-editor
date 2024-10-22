import type {
    FC,
    ChangeEvent,
    KeyboardEvent,
} from 'react';

import React, {
    useState,
    useCallback,
    memo,
    useEffect,
} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useEditor } from '@/components/Editor/hooks/useEditor';

interface YoutubeSelectPropsType {
    defaultYoutubeId: string;
    onSelect: (videoId: string) => void;
}

export function getYouTubeId(url: string): string {
    const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : '';
}

function generateYoutubeUrl(youtubeId: string): string {
    return `https://www.youtube.com/watch?v=${youtubeId}`;
}

const YoutubeSelect: FC<YoutubeSelectPropsType> = ({
    defaultYoutubeId = '',
    onSelect,
}) => {
    const [hasError, setHasError] = useState(false);
    const { setReadOnly } = useEditor();

    const [url, setUrl] = useState(() => {
        if (!defaultYoutubeId) {
            return '';
        }

        return generateYoutubeUrl(defaultYoutubeId);
    });

    // Отключает фокус т.к. при размонтировании событие не доходит
    useEffect(
        () => () => {
            setReadOnly(false);
        },
        [
            setReadOnly,
        ],
    );

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const currentInputValue = e.target.value;
            const youtubeId = getYouTubeId(currentInputValue);

            if (!youtubeId) {
                setHasError(true);
                return;
            }

            setUrl(currentInputValue);
            setHasError(false);
        },
        [],
    );

    const handleEnterKeyPress = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== 'Enter' || hasError) {
                return;
            }

            const youtubeId = getYouTubeId(url);
            onSelect(youtubeId);
        },
        [
            url,
            hasError,
            onSelect,
        ],
    );

    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        sx={{ height: 34 }}
      >
        <TextField
          placeholder={'Введите ссылку на видео с YouTube'}
          autoFocus
          size={'small'}
          fullWidth
          error={hasError}
          defaultValue={url}
          onKeyDown={handleEnterKeyPress}
          onChange={handleInputChange}
        />
      </Box>
    );
};

export default memo(YoutubeSelect);
