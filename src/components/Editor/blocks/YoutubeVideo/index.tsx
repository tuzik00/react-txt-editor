import React from 'react';

import {
    IconYoutube,
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
    renderYoutubeVideo,
}: ElementType): EditorBlockConfigType => ({
    title: 'Видео с Youtube',
    label: <IconYoutube size={IconSize.M} />,
    setupElement: SetupElement,
    element: (props: EditorBlockConfigElementPropsType<ElementDataType>) => (
      <Element
        renderYoutubeVideo={renderYoutubeVideo}
        {...props}
      />
    ),
});
