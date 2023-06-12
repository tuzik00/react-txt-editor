import { InlineStyleTypes } from '@/constants/InlineStyleTypes';

import type { InlineStyleMapType } from './types';

export const customInlineStyleMap: InlineStyleMapType = {
    [InlineStyleTypes.SUPERSCRIPT]: {
        verticalAlign: 'super',
        lineHeight: 0,
        fontSize: '16px',
    },
};
