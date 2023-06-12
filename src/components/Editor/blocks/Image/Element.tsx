import type { FC } from 'react';

import React, {
    useMemo,
    useState,
    useCallback,
} from 'react';

import Box from '@mui/material/Box';
import isEmpty from 'lodash/isEmpty';

import { IconReplace } from '@/components/Icons';

import ContextMenu from '@/components/ContextMenu';

import type { EditorBlockConfigElementPropsType } from '../..';

import {
    ImageStyled,
    ImageContainerStyled,
} from './styled';

import ImageUploader from './ImageUploader';

import type {
    ElementPropsType,
    ExtendElementPropsType,
} from './types';

const Element: FC<EditorBlockConfigElementPropsType<ElementPropsType, ExtendElementPropsType>> = ({
    data,
    onUpdate,
    isDisabled,
    onUploadImage,
    renderImage,
}) => {
    const [isVisible, setVisible] = useState(isEmpty(data));

    const handleImageChange = useCallback(
        async (file: File | null) => {
            if (!file) {
                return;
            }

            const imageSrc = await onUploadImage(file);

            onUpdate({
                src: imageSrc,
                alt: '',
                title: '',
            });

            setVisible(false);
        },
        [
            onUpdate,
            onUploadImage,
        ],
    );

    const imageNode = useMemo(
        () => {
            if (!renderImage) {
                return (
                  <ImageContainerStyled>
                    <ImageStyled
                      src={data.src}
                      alt={data.alt}
                      title={data.title}
                    />
                  </ImageContainerStyled>
                );
            }

            return renderImage(data);
        },
        [
            data,
            renderImage,
        ],
    );

    if (isVisible) {
        return (
          <Box>
            <ImageUploader onSubmit={handleImageChange} />
          </Box>
        );
    }

    return (
      <Box>
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
          {imageNode}
        </ContextMenu>
      </Box>
    );
};

export default Element;
