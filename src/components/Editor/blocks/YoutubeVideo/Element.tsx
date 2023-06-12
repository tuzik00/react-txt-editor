import type { FC } from 'react';

import React, {
    useMemo,
    useState,
    useCallback,
} from 'react';

import Box from '@mui/material/Box';

import { IconReplace } from '@/components/Icons';
import ContextMenu from '@/components/ContextMenu';

import type { EditorBlockConfigElementPropsType } from '../..';

import YoutubeSelect from './YoutubeSelect';
import { VideoWrapperStyled } from './styled';

import type {
    ElementPropsType,
    ExtendElementPropsType,
} from './types';

const Element: FC<EditorBlockConfigElementPropsType<ElementPropsType, ExtendElementPropsType>> = ({
    data,
    onUpdate,
    isDisabled,
    renderYoutubeVideo,
}) => {
    const [isVisible, setVisible] = useState(false);

    const handleYoutubeIdSelect = useCallback(
        (youtubeId: string) => {
            setVisible(false);

            onUpdate({
                id: youtubeId,
            });
        },
        [
            onUpdate,
        ],
    );

    const videoNode = useMemo(
        () => {
            if (!renderYoutubeVideo) {
                return (
                  <VideoWrapperStyled>
                    <iframe
                      allowFullScreen
                      width={'100%'}
                      height={'100%'}
                      src={`https://www.youtube.com/embed/${data.id}`}
                      title={'youtube video'}
                      frameBorder={'0'}
                      allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
                    />
                  </VideoWrapperStyled>
                );
            }

            return renderYoutubeVideo(data);
        },
        [
            data,
            renderYoutubeVideo,
        ],
    );

    if (isVisible) {
        return (
          <YoutubeSelect
            defaultYoutubeId={data.id}
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
          {videoNode}
        </ContextMenu>
      </Box>
    );
};

export default Element;
