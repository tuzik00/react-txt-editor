import type { FC } from 'react';

import React, {
    useState,
    useCallback,
} from 'react';

import Box from '@mui/material/Box';

import { IconReplace } from '@/components/Icons';
import ContextMenu from '@/components/ContextMenu';

import TextField from '@mui/material/TextField';
import type { EditorBlockConfigElementPropsType } from '../..';

import YoutubeSelect from './RutubeSelect';

import type {
    ElementType,
    ElementDataType,
} from './types';

const Element: FC<EditorBlockConfigElementPropsType<ElementDataType, ElementType>> = ({
    data,
    onUpdate,
    isDisabled,
    renderRutubeVideo,
}) => {
    const [isVisible, setVisible] = useState(false);

    const handleYoutubeIdSelect = useCallback(
        (rutubeId: string) => {
            setVisible(false);

            onUpdate({
                id: rutubeId,
                title: '',
            });
        },
        [
            onUpdate,
        ],
    );

    if (isVisible) {
        return (
          <YoutubeSelect
            defaultRutubeId={data.id}
            onSelect={handleYoutubeIdSelect}
          />
        );
    }

    return (
      <Box
        display={'inline-block'}
        maxWidth={'100%'}
      >
        <ContextMenu
          isShow={!isDisabled}
          itemsList={[
            {
                title: 'Заменить',
                icon: <IconReplace />,
                action: () => { setVisible(true); },
            },
        ]}
        >
          <>
            {renderRutubeVideo(data)}
            <TextField
              type={'text'}
              variant={'standard'}
              size={'small'}
              placeholder={'Добавьте описание'}
              fullWidth
              defaultValue={data.title}
              onChange={(e) => {
                    onUpdate({
                        ...data,
                        title: e.target.value,
                    });
                }}
            />
          </>
        </ContextMenu>
      </Box>
    );
};

export default Element;
