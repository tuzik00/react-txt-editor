import React from 'react';

import {
    IconRutube,
    IconSize,
} from '@/components/Icons';

import type {
    EditorBlockConfigElementPropsType,
    EditorBlockConfigType,
} from '@/components/Editor/types';

import SetupElement from './SetupElement';
import Element from './Element';

import type { ElementType, ElementDataType } from './types';

export type { ElementType, ElementDataType };

export default ({
    renderRutubeVideo,
}: ElementType): EditorBlockConfigType => ({
    title: 'Видео с Rutube',
    label: <IconRutube size={IconSize.M} />,
    setupElement: SetupElement,
    element: (props: EditorBlockConfigElementPropsType<ElementDataType>) => (
      <Element
        renderRutubeVideo={renderRutubeVideo}
        {...props}
      />
    ),
});
