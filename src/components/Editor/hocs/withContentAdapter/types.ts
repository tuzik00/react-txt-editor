import type { FC } from 'react';
import type { RawDraftContentState } from 'draft-js';

import type { ContentSchemaType } from '@/utils/contentConverter';

import type { EditorPropsType } from '../../types';

export type EditorContentType = string | ContentSchemaType[];

export type WithContentAdapterPropsType = Omit<EditorPropsType, 'content' | 'onChange'> & {
    contentType?: 'md' | 'blocks';
    content?: EditorContentType;
    onChange?: (
      content: string | ContentSchemaType[],
      headings: string[],
      rawState?: RawDraftContentState
    ) => void;
};

export type WithContentAdapterFnType = (component: FC<EditorPropsType>) =>
    FC<WithContentAdapterPropsType>;
