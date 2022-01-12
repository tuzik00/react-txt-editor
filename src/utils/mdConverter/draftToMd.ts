// Для формирования markdown использется адаптированная под наши задачи
// библиотека https://github.com/Rosey/markdown-draft-js

import {
  RawDraftEntityRange,
  RawDraftInlineStyleRange,
} from 'draft-js';

import { BlockTypes } from '@/constants/BlockTypes';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';

import {
  BlockStyleDict,
  InlineStyleDict,
} from './constants';

import type {
  RenderBlockType,
  EntityItemsType,
  StyleItemsType,
} from './types';

const TRAILING_WHITESPACE = /[ \u0020\t\n]*$/;
const MARKDOWN_STYLE_CHARACTERS = ['*', '_', '~', '`'];
const MARKDOWN_STYLE_CHARACTER_REGXP = /(\*|_|~|\\|`)/g;

let previousOrderedListDepth = 0;

const StyleItems: StyleItemsType = {
  [BlockTypes.UL]: {
    open: () => BlockStyleDict[BlockTypes.UL],
    close: () => BlockStyleDict[BlockTypes.UNSTYLED],
  },
  [BlockTypes.OL]: {
    open: (_, number = 1) => `${number}. `,
    close: () => BlockStyleDict[BlockTypes.UNSTYLED],
  },
  [BlockTypes.BLOCKQUOTE]: {
    open: () => BlockStyleDict[BlockTypes.BLOCKQUOTE],
    close: () => BlockStyleDict[BlockTypes.UNSTYLED],
  },
  [BlockTypes.H1]: {
    open: () => BlockStyleDict[BlockTypes.H1],
    close: () => BlockStyleDict[BlockTypes.UNSTYLED],
  },
  [BlockTypes.H2]: {
    open: () => BlockStyleDict[BlockTypes.H2],
    close: () => BlockStyleDict[BlockTypes.UNSTYLED],
  },
  [BlockTypes.H3]: {
    open: () => BlockStyleDict[BlockTypes.H3],
    close: () => BlockStyleDict[BlockTypes.UNSTYLED],
  },
  [BlockTypes.H4]: {
    open: () => BlockStyleDict[BlockTypes.H4],
    close: () => BlockStyleDict[BlockTypes.UNSTYLED],
  },
  [BlockTypes.H5]: {
    open: () => BlockStyleDict[BlockTypes.H5],
    close: () => BlockStyleDict[BlockTypes.UNSTYLED],
  },
  [BlockTypes.H6]: {
    open: () => BlockStyleDict[BlockTypes.H6],
    close: () => BlockStyleDict[BlockTypes.UNSTYLED],
  },
  [InlineStyleTypes.BOLD]: {
    open: () => InlineStyleDict[InlineStyleTypes.BOLD],
    close: () => InlineStyleDict[InlineStyleTypes.BOLD],
  },
  [InlineStyleTypes.ITALIC]: {
    open: () => InlineStyleDict[InlineStyleTypes.ITALIC],
    close: () => InlineStyleDict[InlineStyleTypes.ITALIC],
  },
  [InlineStyleTypes.STRIKETHROUGH]: {
    open: () => InlineStyleDict[InlineStyleTypes.STRIKETHROUGH],
    close: () => InlineStyleDict[InlineStyleTypes.STRIKETHROUGH],
  },
};

const EntityItems: EntityItemsType = {
  LINK: {
    open: () => '[',
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    close: (entity) => `](${entity?.data?.url || entity?.data?.href || ''})`,
  },
};

const draftToMd: RenderBlockType = (
  block,
  index,
  rawDraftObject,
  orderedList = {},
) => {
  let markdownToAdd: { type: string; style?: unknown; value: unknown; }[] = [];
  let markdownString = '';

  const orderedListNumber = orderedList;
  const { type } = block;

  const markdownStyleCharactersToEscape: {
    character: string;
    index: number;
    markdownStringIndexStart: number;
    markdownStringIndexEnd: number;
  }[] = [];

  if (StyleItems[type]) {
    if (type === BlockTypes.UL || type === BlockTypes.OL) {
      markdownString += ' '.repeat(block.depth * 4);
    }

    if (type === BlockTypes.OL) {
      orderedListNumber[block.depth] = orderedListNumber[block.depth] || 1;

      markdownString += (StyleItems[type]).open(block, orderedListNumber[block.depth]);
      orderedListNumber[block.depth] += 1;

      if (previousOrderedListDepth > block.depth) {
        orderedListNumber[previousOrderedListDepth] = 1;
      }

      previousOrderedListDepth = block.depth;
    } else {
      markdownString += (StyleItems[type]).open(block);
    }
  }

  const openTags: (RawDraftInlineStyleRange & RawDraftEntityRange)[] = [];

  const openTag = (tag: RawDraftInlineStyleRange & RawDraftEntityRange) => {
    openTags.push(tag);

    if (tag.style) {
      if (StyleItems[tag.style]) {
        const styleToAdd = (StyleItems[tag.style]).open();

        markdownToAdd.push({
          type: 'style',
          style: tag,
          value: styleToAdd,
        });
      }
    } else {
      const entity = rawDraftObject.entityMap[tag.key];

      if (EntityItems[entity.type]) {
        const entityToAdd = (EntityItems[entity.type]).open(entity, block);

        markdownToAdd.push({
          type: 'entity',
          value: entityToAdd,
        });
      }
    }
  };

  const closeTag = (tag: RawDraftInlineStyleRange & RawDraftEntityRange) => {
    const popped = openTags.pop();

    if (tag !== popped) {
      throw new Error(
        'Inconstiant violation: Cannot close a tag before all inner tags have been closed',
      );
    }

    if (tag.style) {
      if (StyleItems[tag.style]) {
        const trailingWhitespace = TRAILING_WHITESPACE.exec(markdownString);

        if (trailingWhitespace) {
          markdownString = markdownString.slice(
            0,
            markdownString.length - trailingWhitespace[0].length,
          );
        }

        markdownString += (StyleItems[tag.style]).close();

        if (trailingWhitespace) {
          markdownString += trailingWhitespace[0];
        }
      }
    } else {
      const entity = rawDraftObject.entityMap[tag.key];

      if (EntityItems[entity.type]) {
        markdownString += (EntityItems[entity.type]).close(entity, block);
      }
    }
  };

  const compareTagsLastCloseFirst = (
    a: RawDraftInlineStyleRange,
    b: RawDraftInlineStyleRange,
  ) => (
    b.offset + b.length - (a.offset + a.length)
  );

  const reverse = (
    array: (RawDraftInlineStyleRange & RawDraftEntityRange)[],
  ) => array.concat().reverse();

  Array
    .from(block.text)
    // eslint-disable-next-line array-callback-return
    .some((char, characterIndex) => {
      let character = char;

      reverse(openTags)
        .forEach((tag) => {
          if (tag.offset + tag.length === characterIndex) {
            const tagsToSplit = openTags.slice(openTags.indexOf(tag) + 1);

            reverse(tagsToSplit).forEach(closeTag);
            closeTag(tag);

            tagsToSplit.sort(compareTagsLastCloseFirst).forEach(openTag);
          }
        });

    const inlineTagsToOpen = block.inlineStyleRanges
      .filter((tag) => tag.offset === characterIndex);

    const entityTagsToOpen = block.entityRanges
      .filter((tag) => tag.offset === characterIndex);

      inlineTagsToOpen
      .concat(entityTagsToOpen as (RawDraftInlineStyleRange & RawDraftEntityRange)[])
      .sort(compareTagsLastCloseFirst)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      .forEach(openTag);

    if (character !== ' ' && markdownToAdd.length) {
      markdownString += markdownToAdd
        .map((item) => item.value)
        .join('');

      markdownToAdd = [];
    }

      if (characterIndex === 0 && character === '#' && block.text[1] && block.text[1] === ' ') {
        character = character.replace('#', '\\#');
      } else if (characterIndex === 0 && character === '>') {
        character = character.replace('>', '\\>');
      }

      if (MARKDOWN_STYLE_CHARACTERS.includes(character)) {
        const openingStyle = markdownStyleCharactersToEscape
          .find((item) => item.character === character);

        if (!openingStyle && block.text[characterIndex - 1] === ' ' && block.text[characterIndex + 1] !== ' ') {
          markdownStyleCharactersToEscape.push({
            character,
            index: characterIndex,
            markdownStringIndexStart: markdownString.length + character.length - 1,
            markdownStringIndexEnd: markdownString.length + character.length,
          });
        } else if (
          openingStyle
          && block.text[characterIndex - 1] === character
          && characterIndex === openingStyle.index + 1
        ) {
          openingStyle.markdownStringIndexEnd += 1;
        } else if (openingStyle) {
          const openingStyleLength = (
            openingStyle.markdownStringIndexEnd - openingStyle.markdownStringIndexStart
          );

          let escapeCharacter = false;
          let popOpeningStyle = false;

          if (
            openingStyleLength === 1
            && (block.text[characterIndex + 1] === ' '
              || !block.text[characterIndex + 1])
          ) {
            popOpeningStyle = true;
            escapeCharacter = true;
          }

          if (openingStyleLength === 2 && block.text[characterIndex + 1] === character) {
            escapeCharacter = true;
          }

          if (
            openingStyleLength === 2
            && block.text[characterIndex - 1] === character
            && (block.text[characterIndex + 1] === ' '
              || !block.text[characterIndex + 1])
          ) {
            popOpeningStyle = true;
            escapeCharacter = true;
          }

          if (popOpeningStyle) {
            markdownStyleCharactersToEscape
              .splice(markdownStyleCharactersToEscape
                .indexOf(openingStyle), 1);

            let replacementString = markdownString
              .slice(openingStyle.markdownStringIndexStart, openingStyle.markdownStringIndexEnd);

            replacementString = replacementString.replace(MARKDOWN_STYLE_CHARACTER_REGXP, '\\$1');
            markdownString = (
              markdownString.slice(0, openingStyle.markdownStringIndexStart)
              + replacementString
              + markdownString.slice(openingStyle.markdownStringIndexEnd));
          }

          if (escapeCharacter) {
            character = `\\${character}`;
          }
        }
      }

    markdownString += character;
  });

  reverse(openTags).forEach(closeTag);

  if (StyleItems[type]) {
    markdownString += (StyleItems[type]).close(block);
  }

  return markdownString;
};

export default draftToMd;
