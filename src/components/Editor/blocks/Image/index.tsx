import React from 'react';

import type {
    EditorBlockConfigElementPropsType,
    EditorBlockConfigType,
} from '@/components/Editor/types';

import {
    IconImg,
    IconSize,
} from '@/components/Icons';

import Element from './Element';
import type { ElementType, ElementDataType } from './types';

export type { ElementType, ElementDataType };

export default ({
    onUploadImage,
    renderImage,
}: ElementType): EditorBlockConfigType => ({
    title: 'Картинка',
    label: <IconImg size={IconSize.M} />,
    element: (props: EditorBlockConfigElementPropsType<ElementDataType>) => (
      <Element
        renderImage={renderImage}
        onUploadImage={onUploadImage}
        {...props}
      />
    ),
});
