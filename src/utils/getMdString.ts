import { CONTENT_BLOCK_NAME } from '@/utils/blocksConverter/constants';
import type { BlockType } from '@/utils/blocksConverter/types';

export const getMdString = (blocks: BlockType[] = []) => {
  const mdBlock = blocks.find((block) => block.type === CONTENT_BLOCK_NAME);

  if (!mdBlock) {
    return '';
  }

  return mdBlock.data?.content as string;
};
