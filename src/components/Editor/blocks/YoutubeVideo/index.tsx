import type { ReactElement } from 'react';
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

import type { ElementPropsType } from './types';

export interface YoutubeVideoRootPropsType {
    renderYoutubeVideo?: (props: ElementPropsType) => ReactElement;
}

export default ({
    renderYoutubeVideo,
}: YoutubeVideoRootPropsType): EditorBlockConfigType => ({
    title: 'Видео с Youtube',
    label: <IconYoutube size={IconSize.M} />,
    setupElement: SetupElement,
    element: (props: EditorBlockConfigElementPropsType<ElementPropsType>) => (
      <Element
        renderYoutubeVideo={renderYoutubeVideo}
        {...props}
      />
    ),
});
