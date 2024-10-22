import type { ReactElement } from 'react';

export type ElementDataType = Record<string, unknown>;

export interface ElementType {
    onUploadImage: (file: File) => Promise<ElementDataType>;
    renderImage: (props: ElementDataType) => ReactElement;
}
