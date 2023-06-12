import type {
    FC,
    KeyboardEvent,
} from 'react';

import React, {
    useState,
    useMemo,
    useCallback,
    memo,
} from 'react';

import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import {
    IconLeftArrow,
    IconSize,
} from '@/components/Icons';

import AnchorLinkContainerStyled from './styled/AnchorLinkContainer';
import TextInfoStyled from './styled/TextInfo';

import {
    URL_REGEXP,
    LINK_MAX_LENGTH,
} from './constants';

import type { AnchorLinkPropsType } from './types';

const urlRegexp = new RegExp(URL_REGEXP, 'i');

export const AnchorLink: FC<AnchorLinkPropsType> = ({
    isRenderClose = true,
    onSelect,
    onClose,
}) => {
    const [linkUrl, setLinkUrl] = useState('');

    const isValidLintUrl = useMemo(
        () => linkUrl.length < LINK_MAX_LENGTH && urlRegexp.test(linkUrl),
        [
            linkUrl,
        ],
    );

    const handleUrlSelect = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.code === 'Enter') {
                onSelect(linkUrl);
            }
        },
        [
            linkUrl,
            onSelect,
        ],
    );

    const handleLinkChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setLinkUrl(e.target.value);
        },
        [],
    );

    const hasError = linkUrl.length > 0 && !isValidLintUrl;
    const isTextInfoVisible = !hasError && linkUrl.length > 0;

    return (
      <AnchorLinkContainerStyled>
        {isRenderClose && (
        <IconButton onClick={onClose}>
          <IconLeftArrow size={IconSize.SM} />
        </IconButton>
            )}

        <TextField
          fullWidth
          autoFocus
          placeholder={'Введите адрес ссылки'}
          size={'small'}
          error={hasError}
          onChange={handleLinkChange}
          onKeyPress={handleUrlSelect}
        />

        <TextInfoStyled isVisible={isTextInfoVisible}>
          {'Нажмите Enter'}
        </TextInfoStyled>
      </AnchorLinkContainerStyled>
    );
};

export default memo(AnchorLink);
