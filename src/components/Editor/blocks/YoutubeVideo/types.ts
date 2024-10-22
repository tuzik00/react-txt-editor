import type { ReactElement } from 'react';

export type ElementDataType = {
    id: string;
    title: string;
};

export interface ElementType {
    renderYoutubeVideo: (props: ElementDataType) => ReactElement;
}
