import uniq from 'lodash/uniq';

import { BlockTypes } from '@/constants/BlockTypes';
import { draftToMd } from '@/utils/mdConverter';
import type { EditorBlockConfigMapType } from '@/components/Editor';

import { CONTENT_BLOCK_NAME } from './constants';

import type {
    DraftToBlocksType,
    ContentSchemaType,
} from './types';

const getAvaliableMdBlocks = (blocks: EditorBlockConfigMapType): string[] => uniq([
    BlockTypes.CONCLUSION,
    BlockTypes.IMAGE,
    BlockTypes.YOUTUBE,
    ...Object.keys(blocks),
]);

const draftToBlocks: DraftToBlocksType = (
    rawDraftObject,
    contentType = 'md',
    customBlocks = {},
) => {
    let orderList = {};

    const blockTypes = [
        BlockTypes.H1,
        BlockTypes.H2,
        BlockTypes.H3,
        BlockTypes.H4,
        BlockTypes.H5,
        BlockTypes.H6,
        BlockTypes.UL,
        BlockTypes.OL,
        BlockTypes.HR,
        BlockTypes.BLOCKQUOTE,
        BlockTypes.ATOMIC,
        BlockTypes.UNSTYLED,
        BlockTypes.PARAGRAPH,
        ...(contentType === 'md' ? getAvaliableMdBlocks(customBlocks) : []),
    ].filter(Boolean);

    return rawDraftObject
        .blocks.reduce<ContentSchemaType[]>((accum, block, index) => {
            if (block.type === BlockTypes.UNSTYLED) {
                orderList = {};
            }

            if (blockTypes.includes(block.type)) {
                const prevIndex = accum.length - 1;
                const prevBlock = accum[prevIndex];
                const md = draftToMd(block, index, rawDraftObject, orderList, customBlocks);

                if (prevBlock?.type === CONTENT_BLOCK_NAME) {
                    if (prevBlock?.data?.content) {
                        // Создание нового параграфа
                        prevBlock.data.content += `\n\n${md}`;
                    } else {
                        prevBlock.data = { content: md };
                    }

                    accum.splice(prevIndex, 1, prevBlock);

                    return accum;
                }

                accum.push({
                    type: CONTENT_BLOCK_NAME,
                    data: md ? { content: md } : null,
                });

                return accum;
            }

            // для обратной совместимости с контентом в журнале
            if (block.type === BlockTypes.CONCLUSION && contentType === 'blocks') {
                const content = draftToMd(block, index, rawDraftObject, orderList, customBlocks);

                accum.push({
                    type: BlockTypes.CONCLUSION,
                    data: content ? {
                        content: content
                            .replace('::conclusion[', '')
                            .replace(']{}', ''),
                    } : null,
                });

                return accum;
            }

            accum.push({
                type: block.type,
                data: block.data || null,
            });

            return accum;
        }, []);
};

export default draftToBlocks;
