import type { ReactElement } from 'react';

export type ElementPropsType = {
    src: string;
    alt: string;
    title: string;
};

export interface ExtendElementPropsType {
    onUploadImage: (file: File) => Promise<string>;
    renderImage?: (props: ElementPropsType) => ReactElement;
}
