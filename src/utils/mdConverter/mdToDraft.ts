// Для формирования markdown использется адаптированная под наши задачи
// библиотека https://github.com/Rosey/markdown-draft-js

import {
  DraftInlineStyleType,
  RawDraftEntityRange,
  RawDraftInlineStyleRange,
} from 'draft-js';

import { Remarkable } from 'remarkable';
import { BlockTypes } from '@/constants/BlockTypes';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';
import { EntityTypes } from '@/constants/EntityTypes';
import { MutabilityTypes } from '@/constants/MutabilityTypes';

import {
  BlockParamsType,
  DefaultBlockEntitiesType,
  DefaultBlocksType,
  MdToDraftType,
  ParseInlineType,
} from './types';

const strlen = (str: string) => Array.from(str).length;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DefaultBlockTypes: DefaultBlocksType = {
  paragraph_open: () => ({
    type: BlockTypes.UNSTYLED,
    text: '',
    entityRanges: [],
    inlineStyleRanges: [],
  }),
  blockquote_open: () => ({
    type: BlockTypes.BLOCKQUOTE,
    text: '',
  }),
  ordered_list_item_open: () => ({
    type: BlockTypes.OL,
    text: '',
  }),
  unordered_list_item_open: () => ({
    type: BlockTypes.UL,
    text: '',
  }),
  heading_open: (item) => {
    const heading = [
      '',
      BlockTypes.H1,
      BlockTypes.H2,
      BlockTypes.H3,
      BlockTypes.H4,
      BlockTypes.H5,
      BlockTypes.H6,
    ];

    return {
      type: heading[item?.hLevel || 1],
      text: '',
    };
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DefaultBlockEntities: DefaultBlockEntitiesType = {
  link_open: (item) => ({
    type: EntityTypes.LINK,
    mutability: MutabilityTypes.MUTABLE,
    data: {
      url: item?.href || '',
      href: item?.href || '',
    },
  }),
};

const DefaultBlockStyles = {
  strong_open: InlineStyleTypes.BOLD,
  em_open: InlineStyleTypes.ITALIC,
  del_open: InlineStyleTypes.STRIKETHROUGH,
};

let idCounter = -1;
const generateUniqueKey = () => {
  idCounter += 1;
  return idCounter;
};

const parseInline: ParseInlineType = (
  inlineItem,
  BlockEntities,
  BlockStyles,
) => {
  let content = '';
  const blockEntities: Record<string, unknown> = {};

  const blockEntityRanges: RawDraftEntityRange[] = [];
  let blockInlineStyleRanges: RawDraftInlineStyleRange[] = [];

  inlineItem?.children?.forEach((child) => {
    if (child.type === 'text' && 'content' in child) {
      content += child.content;
    } else if (child.type === 'softbreak') {
      content += '\n';
    } else if (child.type === 'hardbreak') {
      content += '\n';
    } else if (BlockStyles[child.type]) {
      const styleBlock = {
        offset: strlen(content) || 0,
        length: 0,
        style: BlockStyles[child.type] as DraftInlineStyleType,
      };

      blockInlineStyleRanges.push(styleBlock);
    } else if (BlockEntities[child.type]) {
      const key = generateUniqueKey();

      blockEntities[key] = BlockEntities[child.type](child);

      blockEntityRanges.push({
        offset: strlen(content) || 0,
        length: 0,
        key,
      });
    } else if (
      child.type.indexOf('_close') !== -1
      && BlockEntities[child.type.replace('_close', '_open')]
    ) {
      blockEntityRanges[blockEntityRanges.length - 1].length = (
        strlen(content) - blockEntityRanges[blockEntityRanges.length - 1].offset
      );
    } else if (
      child.type.indexOf('_close') !== -1
      && BlockStyles[child.type.replace('_close', '_open')]
    ) {
      const type = BlockStyles[child.type.replace('_close', '_open')];

      blockInlineStyleRanges = blockInlineStyleRanges
        .map((style) => {
          if (style.length === 0 && style.style === type) {
            // eslint-disable-next-line no-param-reassign
            style.length = strlen(content) - style.offset;
          }

          return style;
        });
    }
  });

  return {
    content,
    blockEntities,
    blockEntityRanges,
    blockInlineStyleRanges,
  };
};

const mdToDraft: MdToDraftType = (string, options = { preserveNewlines: true }) => {
  const md = new Remarkable();
  const blocks: BlockParamsType[] = [];
  const entityMap = {};
  const parsedData = md.parse(string, {});

  let currentListType: string;
  let previousBlockEndingLine = 0;

  parsedData.forEach((item) => {
    if (item.type === 'bullet_list_open') {
      currentListType = 'unordered_list_item_open';
    } else if (item.type === 'ordered_list_open') {
      currentListType = 'ordered_list_item_open';
    }

    let itemType = item.type;

    if (itemType === 'list_item_open') {
      itemType = currentListType;
    }

    if (itemType === 'inline') {
      const {
        content,
        blockEntities,
        blockEntityRanges,
        blockInlineStyleRanges,
      } = parseInline(item, DefaultBlockEntities, DefaultBlockStyles);

      const blockToModify = blocks[blocks.length - 1];

      blockToModify.text = content;
      blockToModify.inlineStyleRanges = blockInlineStyleRanges;
      blockToModify.entityRanges = blockEntityRanges;

      Object.assign(entityMap, blockEntities);
    } else if ((
      itemType.indexOf('_open') !== -1
      || itemType === 'fence'
      || itemType === 'hr'
      || itemType === 'htmlblock')
      && DefaultBlockTypes[itemType]
    ) {
      let depth = 0;
      let block;

      if (item.level > 0) {
        depth = Math.floor(item.level / 2);
      }

      if (item.level === 0 || item.type === 'list_item_open') {
        block = { depth, ...DefaultBlockTypes[itemType](item) };
      } else if (item.level > 0 && blocks[blocks.length - 1].text) {
        block = { ...blocks[blocks.length - 1] };
      }

      if (block && options.preserveNewlines && item.lines?.length) {
        const totalEmptyParagraphsToCreate = item.lines[0] - previousBlockEndingLine;

        for (let i = 0; i < totalEmptyParagraphsToCreate; i += 1) {
          blocks.push(DefaultBlockTypes.paragraph_open());
        }
      }

      if (block && item.lines?.length) {
        previousBlockEndingLine = item.lines[1] || 0;

        if (
          block.type === BlockTypes.UL
          || block.type === BlockTypes.OL
        ) {
          previousBlockEndingLine += 1;
        }
        blocks.push(block);
      }
    }
  });

  if (!blocks.length) {
    blocks.push(DefaultBlockTypes.paragraph_open());
  }

  return {
    entityMap,
    blocks,
  };
};

export default mdToDraft;
