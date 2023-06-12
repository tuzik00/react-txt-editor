// Для формирования markdown использется адаптированная под наши задачи
// библиотека https://github.com/Rosey/markdown-draft-js

import type {
    DraftInlineStyleType,
    RawDraftEntityRange,
    RawDraftInlineStyleRange,
} from 'draft-js';

import head from 'lodash/head';
import last from 'lodash/last';
import { Remarkable } from 'remarkable';

import { BlockTypes } from '@/constants/BlockTypes';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';
import { EntityTypes } from '@/constants/EntityTypes';
import { MutabilityTypes } from '@/constants/MutabilityTypes';

import {
    strlen,
    parseDirective,
    generateUniqueKey,
} from './utils';

import type {
    BlockParamsType,
    DefaultBlockEntitiesType,
    DefaultBlocksType,
    MdToDraftType,
    ParseInlineType,
} from './types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DefaultBlockTypes: DefaultBlocksType = {
    image: () => ({
        type: BlockTypes.IMAGE,
        text: '',
    }),
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
    sup: InlineStyleTypes.SUPERSCRIPT,
    strong_open: InlineStyleTypes.BOLD,
    em_open: InlineStyleTypes.ITALIC,
    del_open: InlineStyleTypes.STRIKETHROUGH,
};

const parseInline: ParseInlineType = (
    inlineItem,
    BlockEntities,
    BlockStyles,
) => {
    let content = '';
    const blockEntities: Record<string, unknown> = {};
    let blockEntityRanges: RawDraftEntityRange[] = [];

    const inlineBlocks = [] as BlockParamsType[];

    let blockInlineStyleRanges: RawDraftInlineStyleRange[] = [];

    const addUnstyledBlock = () => {
        inlineBlocks.push({
            text: content.trim(),
            type: BlockTypes.UNSTYLED,
            inlineStyleRanges: blockInlineStyleRanges,
            entityRanges: blockEntityRanges,
            data: {},
        });

        blockInlineStyleRanges = [];
        blockEntityRanges = [];
        content = '';
    };

    const updateCurrentBlock = (block: BlockParamsType) => {
        if (content) {
            addUnstyledBlock();
        }

        inlineBlocks.push(block);
    };

    inlineItem?.children?.forEach((child) => {
        if (child.type === 'text' && 'content' in child) {
            parseDirective(child.content as string, (node) => {
                if (node.name === 'youtube') {
                    // eslint-disable-next-line no-param-reassign
                    child.content = '';

                    updateCurrentBlock({
                        text: '',
                        type: BlockTypes.YOUTUBE,
                        data: {
                            alt: node.text,
                            ...node.attrs,
                        },
                    });

                    return;
                }

                if (node.name === 'link') {
                    content += (child.content as string)
                        .replace(/:link\[/, '')
                        .replace(/]{[\D\w]+}/, '');

                    // eslint-disable-next-line no-param-reassign
                    child.content = '';

                    const key = generateUniqueKey();

                    blockEntities[key] = {
                        type: EntityTypes.DIRECTIVE_LINK,
                        mutability: MutabilityTypes.MUTABLE,
                        data: {
                            ...node.attrs,
                        },
                    };

                    blockEntityRanges.push({
                        offset: node.offset,
                        length: node.length,
                        key,
                    });

                    return;
                }

                if (node.name === 'conclusion') {
                    // eslint-disable-next-line no-param-reassign
                    child.content = '';

                    updateCurrentBlock({
                        text: node.text,
                        type: BlockTypes.CONCLUSION,
                        data: {
                            content: node?.attrs?.text as string,
                        },
                    });

                    return;
                }

                if (/^\S+$/.test(node.name)) {
                    child.content = '';

                    updateCurrentBlock({
                        text: '',
                        type: node.name,
                        data: { ...node?.attrs },
                    });
                }
            });

            content += child.content;
        } else if (child.type === 'image') {
            updateCurrentBlock({
                text: '',
                type: BlockTypes.IMAGE,
                data: {
                    ...child,
                },
            });
        } else if (child.type === 'softbreak' && content) {
            content += '\n';
        } else if (child.type === 'hardbreak' && content) {
            content += '\n';
        } else if (child.type === 'code' && 'content' in child) {
            const codeStr = child?.content as string || '';
            const [, id] = /youtube\s([^"&?/\s]{11})/.exec(codeStr) || ['', ''];

            if (id) {
                updateCurrentBlock({
                    text: '',
                    type: BlockTypes.YOUTUBE,
                    data: {
                        id,
                    },
                });
            }
        } else if (BlockStyles[child.type]) {
            const styleBlock = {
                offset: strlen(content) || 0,
                length: 0,
                style: BlockStyles[child.type] as DraftInlineStyleType,
            };

            if (child.type === 'sub' || child.type === 'sup') {
                if ('content' in child) {
                    styleBlock.length = strlen(child.content as string);
                    content += child.content as string;
                }
            }

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

    // Если остался еще контент, либо контент без дирректив т.е. будет всего 1 блок
    if (content) {
        addUnstyledBlock();
    }

    return {
        inlineBlocks,
        blockEntities,
    };
};

const mdToDraft: MdToDraftType = (string, options = { preserveNewlines: true }) => {
    const md = new Remarkable('default');

    md.inline.ruler.enable(['sup']);

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
                inlineBlocks,
                blockEntities,
            } = parseInline(item, DefaultBlockEntities, DefaultBlockStyles);

            const lastItem = last(blocks);

            if (!inlineBlocks.length || !lastItem) {
                return;
            }

            /*
                Если это параграф, то тогда удаляем начальный элемент,
                т.к. в параграфе может быть картинка или другие блоки
                которые должны быть в отдельном параграфе, это сделано для поддержки старого формата
            */
            if (lastItem?.type === 'unstyled') {
                blocks.pop();
                inlineBlocks.forEach((newBlock) => blocks.push(newBlock));
            } else {
                // Получаем первый элемент, т.к. это не параграф и кроме текста ничего быть не может
                const firstItem = head(inlineBlocks);

                const {
                    text,
                    inlineStyleRanges,
                    entityRanges,
                } = firstItem || {};

                // Копируем контент элемента
                lastItem.text = text;
                lastItem.inlineStyleRanges = inlineStyleRanges;
                lastItem.entityRanges = entityRanges;
            }

            Object.assign(entityMap, blockEntities);
        } else if (itemType === 'hr') {
            blocks.push({
                depth: 0,
                entityRanges: [],
                inlineStyleRanges: [],
                text: '',
                type: BlockTypes.HR,
            });
        } else if (itemType.indexOf('_open') !== -1 && DefaultBlockTypes[itemType]) {
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
