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
    defaultRutubeId: string;
    onSelect: (videoId: string) => void;
}

export function getRuTubeId(url: string): string {
    const arr = url.split(/(rutube\.ru\/video\/)/);
    return arr.length > 2 ? arr[2].split(/[^\w-]/i)[0] : '';
}

function generateYoutubeUrl(rutubeId: string): string {
    return `https://rutube.ru/video/${rutubeId}/`;
}

const RutubeSelect: FC<YoutubeSelectPropsType> = ({
    defaultRutubeId = '',
    onSelect,
}) => {
    const [hasError, setHasError] = useState(false);
    const { setReadOnly } = useEditor();

    const [url, setUrl] = useState(() => {
        if (!defaultRutubeId) {
            return '';
        }

        return generateYoutubeUrl(defaultRutubeId);
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
            const ruTubeId = getRuTubeId(currentInputValue);

            if (!ruTubeId) {
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

            const ruTubeId = getRuTubeId(url);
            onSelect(ruTubeId);
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
          placeholder={'Введите ссылку на видео с Rutube'}
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

export default memo(RutubeSelect);
