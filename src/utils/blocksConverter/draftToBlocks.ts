import { BlockTypes } from '@/constants/BlockTypes';
import { draftToMd } from '@/utils/mdConverter';

import { CONTENT_BLOCK_NAME } from './constants';

import type {
  DraftToBlocksType,
  BlockType as ConverterBlockType,
} from './types';

const draftToBlocks: DraftToBlocksType = (rawDraftObject) => {
  let orderList = {};

  return rawDraftObject
    .blocks.reduce<ConverterBlockType[]>((accum, block, index) => {
      if (block.type === BlockTypes.UNSTYLED) {
        orderList = {};
      }

      switch (block.type) {
        case BlockTypes.H1:
        case BlockTypes.H2:
        case BlockTypes.H3:
        case BlockTypes.H4:
        case BlockTypes.H5:
        case BlockTypes.H6:
        case BlockTypes.UL:
        case BlockTypes.OL:
        case BlockTypes.BLOCKQUOTE:
        case BlockTypes.ATOMIC:
        case BlockTypes.UNSTYLED:
        case BlockTypes.PARAGRAPH: {
          const prevIndex = accum.length - 1;
          const prevBlock = accum[prevIndex];

          if (prevBlock?.type === CONTENT_BLOCK_NAME) {
            if (prevBlock?.data?.content) {
              const md = draftToMd(block, index, rawDraftObject, orderList);
              prevBlock.data.content += `\n\n${md}`;
            } else {
              prevBlock.data = { content: '\n\n' };
            }

            accum.splice(prevIndex, 1, prevBlock);
            return accum;
          }

          const content = draftToMd(block, index, rawDraftObject, orderList);

          accum.push({
            type: CONTENT_BLOCK_NAME,
            data: content ? { content } : null,
          });

          return accum;
        }

        default: {
          accum.push({
            type: block.type,
            data: block.data || null,
          });

          return accum;
        }
      }
    }, []);
};

export default draftToBlocks;
