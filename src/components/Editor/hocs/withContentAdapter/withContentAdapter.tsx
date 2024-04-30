import type { FC } from 'react';
import React, {
    useMemo,
} from 'react';

import type { RawDraftContentState } from 'draft-js';
import { useDebouncedCallback } from 'use-debounce';

import type { ContentSchemaType } from '@/utils/contentConverter';

import {
    blocksToDraft,
    draftToBlocks,
    getMdContent,
    createContentBlock,
    validateContentSchema,
} from '@/utils/contentConverter';

import { BlockTypes } from '@/constants/BlockTypes';

import type {
    WithContentAdapterFnType,
    WithContentAdapterPropsType,
} from './types';

const headingTypes = [
    BlockTypes.H1,
    BlockTypes.H2,
    BlockTypes.H3,
    BlockTypes.H4,
    BlockTypes.H5,
    BlockTypes.H6,
];

const getHeadings = (rawState: RawDraftContentState): string[] => {
    const headings: string[] = [];

    rawState.blocks.forEach((block) => {
        if (headingTypes.includes(block.type as BlockTypes)) {
            headings.push(block.text);
        }
    });

    return headings;
};

const withContentAdapter: WithContentAdapterFnType = (Component) => {
    const Wrapper: FC<WithContentAdapterPropsType> = ({
        contentType = 'md',
        content = '',
        blockRenderMap,
        onChange = () => {},
        ...props
    }) => {
        const handleDebouncedChangeState = useDebouncedCallback(
            (rawState: RawDraftContentState) => {
                try {
                    const blocks = draftToBlocks(rawState, contentType, blockRenderMap);

                    if (contentType === 'md') {
                        onChange(getMdContent(blocks), getHeadings(rawState), rawState);
                        return;
                    }

                    onChange(blocks, getHeadings(rawState), rawState);
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.warn(e);
                }
            },
            300,
        );

        const editorState = useMemo<RawDraftContentState>(
            () => {
                try {
                    if (!content?.length) {
                        return blocksToDraft([]);
                    }

                    if (contentType === 'md') {
                        return createContentBlock(content as string);
                    }

                    const isContentValid = validateContentSchema(content);

                    if (!isContentValid) {
                        return blocksToDraft([]);
                    }

                    return blocksToDraft(content as ContentSchemaType[]);
                } catch (e) {
                    return createContentBlock('error content state');
                }
            },
            [
                contentType,
                content,
            ],
        );

        return (
          <Component
            {...props}
            content={editorState}
            blockRenderMap={blockRenderMap}
            onChange={handleDebouncedChangeState}
          />
        );
    };

    return Wrapper;
};

export default withContentAdapter;
