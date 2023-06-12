import React from 'react';
import type { ReactElement } from 'react';

import type {
    EditorBlockConfigElementPropsType,
    EditorBlockConfigType,
} from '@/components/Editor/types';

import {
    IconImg,
    IconSize,
} from '@/components/Icons';

import Element from './Element';
import type { ElementPropsType } from './types';

export interface ImageRootPropsType {
    onUploadImage: (file: File) => Promise<string>;
    renderImage?: (props: ElementPropsType) => ReactElement;
}

export default ({
    onUploadImage,
    renderImage,
}: ImageRootPropsType): EditorBlockConfigType => ({
    title: 'Картинка',
    label: <IconImg size={IconSize.M} />,
    element: (props: EditorBlockConfigElementPropsType<ElementPropsType>) => (
      <Element
        renderImage={renderImage}
        onUploadImage={onUploadImage}
        {...props}
      />
    ),
});
