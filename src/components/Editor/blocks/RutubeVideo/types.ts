import type { ReactElement } from 'react';

export type ElementDataType = {
    id: string;
    title: string;
};

export interface ElementType {
    renderRutubeVideo: (props: ElementDataType) => ReactElement;
}
