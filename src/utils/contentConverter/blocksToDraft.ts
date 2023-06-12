import type {
    RawDraftContentBlock,
    RawDraftEntity,
} from 'draft-js';

import { nanoid } from 'nanoid';

import { mdToDraft } from '@/utils/mdConverter';
import { BlockTypes } from '@/constants/BlockTypes';

import { CONTENT_BLOCK_NAME } from './constants';

import type {
    BlocksToDraftType,
    EmptyBlockParamsType,
} from './types';

export const createEmptyBlock = (
    props?: EmptyBlockParamsType,
): RawDraftContentBlock => ({
    key: nanoid(5),
    depth: 0,
    text: '',
    type: BlockTypes.UNSTYLED,
    data: {},
    inlineStyleRanges: [],
    entityRanges: [],
    ...(props || {}),
});

const blocksToDraft: BlocksToDraftType = (editorBlocks) => {
    const contentState = {
        blocks: [],
        entityMap: {},
    };

    if (editorBlocks?.length === 0) {
        return {
            ...contentState,
        };
    }

    const draftBlocks = editorBlocks?.reduce<{
        blocks: RawDraftContentBlock[];
        entityMap: Record<string, RawDraftEntity>;
    }>((accum, block) => {
        switch (block.type) {
            case CONTENT_BLOCK_NAME: {
                const content = block?.data?.content as string;
                const paragraphs = content?.split(/\n\n/);

                paragraphs?.forEach((paragraph) => {
                    const {
                        blocks,
                        entityMap,
                    } = mdToDraft(paragraph);

                    // eslint-disable-next-line no-param-reassign
                    accum.blocks = [
                        ...accum.blocks,
                        ...blocks as RawDraftContentBlock[],
                    ];

                    // eslint-disable-next-line no-param-reassign
                    accum.entityMap = {
                        ...accum.entityMap,
                        ...entityMap as Record<string, RawDraftEntity>,
                    };
                });

                return accum;
            }

            default:
                accum.blocks.push(
                    createEmptyBlock({
                        type: block.type,
                        data: block?.data ?? {},
                    }),
                );

                return accum;
        }
    }, {
        ...contentState,
    });

    return draftBlocks;
};

export default blocksToDraft;
