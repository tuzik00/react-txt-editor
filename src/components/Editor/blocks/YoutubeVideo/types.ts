import type { ReactElement } from 'react';

export type ElementPropsType = {
    id: string;
};

export interface ExtendElementPropsType {
    renderYoutubeVideo?: (props: ElementPropsType) => ReactElement;
}
