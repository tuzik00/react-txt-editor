import type { FC } from 'react';

import React, {
    useState,
    useCallback,
} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import isEmpty from 'lodash/isEmpty';

import { IconReplace } from '@/components/Icons';

import ContextMenu from '@/components/ContextMenu';

import type { EditorBlockConfigElementPropsType } from '../..';

import ImageUploader from './ImageUploader';

import type {
    ElementDataType,
    ElementType,
} from './types';

const Element: FC<EditorBlockConfigElementPropsType<ElementDataType, ElementType>> = ({
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

            const uploadResult = await onUploadImage(file);

            onUpdate(uploadResult);

            setVisible(false);
        },
        [
            onUpdate,
            onUploadImage,
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
          <>
            {renderImage(data)}
            <TextField
              type={'text'}
              variant={'standard'}
              size={'small'}
              placeholder={'Добавьте описание'}
              fullWidth
              onChange={(e) => {
                onUpdate({
                    ...data,
                    alt: e.target.value,
                });
            }}
            />
          </>
        </ContextMenu>
      </Box>
    );
};

export default Element;
