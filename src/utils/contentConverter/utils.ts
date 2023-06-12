import type { RawDraftContentState } from 'draft-js';

import blocksToDraft from './blocksToDraft';
import { CONTENT_BLOCK_NAME } from './constants';

import type { ContentSchemaType } from './types';

export const getMdContent = (blocks: ContentSchemaType[] = []): string => {
    const mdBlock = blocks.find((block) => block.type === CONTENT_BLOCK_NAME);

    if (!mdBlock) {
        return '';
    }

    return (mdBlock.data?.content as string) || '';
};

export const createContentBlock = (content: string): RawDraftContentState => blocksToDraft([
    {
        type: CONTENT_BLOCK_NAME,
        data: {
            content,
        },
    },
]);

export const valdiateChild = ({
    type,
    data,
    children,
}: ContentSchemaType): boolean => {
    if (typeof type !== 'string') {
        return false;
    }

    // Проверка на null и object
    if (typeof data !== 'object') {
        return false;
    }

    if (children) {
        return children.every(valdiateChild);
    }

    return true;
};

export const validateContentSchema = (data: ContentSchemaType[] | string): boolean => {
    if (!Array.isArray(data)) {
        return false;
    }

    return data.every(valdiateChild);
};
