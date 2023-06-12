import React from 'react';

import {
    IconBlockquote,
    IconBold,
    IconConclusion,
    IconItalic,
    IconLink,
    IconNumericList,
    IconOrderedList,
    IconSize,
    IconStrike,
    IconSuper,
    IconText,
} from '@/components/Icons';

import { EntityTypes } from '@/constants/EntityTypes';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';
import { BlockTypes } from '@/constants/BlockTypes';

import {
    ActionType,
    RenderType,
    SelectionType,
} from './constants';

import type { ConfigItemType } from './types';

const DISABLED_INLINE_BLOCKS = [
    InlineStyleTypes.SUPERSCRIPT,
    InlineStyleTypes.BOLD,
    InlineStyleTypes.ITALIC,
    InlineStyleTypes.STRIKETHROUGH,
    EntityTypes.LINK,
];

const DISABLED_CUSTOM_BLOCKS = [
    BlockTypes.BLOCKQUOTE,
    BlockTypes.CONCLUSION,
];

const headingBlock: ConfigItemType = {
    renderType: RenderType.LIST,
    defaultIcon: <IconText size={IconSize.SM} />,
    buttons: [
        {
            title: 'Заголовок 1 уровня',
            inactiveIcon: 'H1',
            activeIcon: 'H1',
            type: BlockTypes.H1,
            actionType: ActionType.BLOCK,
        },
        {
            title: 'Заголовок 2 уровня',
            inactiveIcon: 'H2',
            activeIcon: 'H2',
            type: BlockTypes.H2,
            actionType: ActionType.BLOCK,
        },
        {
            title: 'Заголовок 3 уровня',
            inactiveIcon: 'H3',
            activeIcon: 'H3',
            type: BlockTypes.H3,
            actionType: ActionType.BLOCK,
        },
        {
            title: 'Заголовок 4 уровня',
            inactiveIcon: 'H4',
            activeIcon: 'H4',
            type: BlockTypes.H4,
            actionType: ActionType.BLOCK,
        },
        {
            title: 'Заголовок 5 уровня',
            inactiveIcon: 'H5',
            activeIcon: 'H5',
            type: BlockTypes.H5,
            actionType: ActionType.BLOCK,
        },
        {
            title: 'Заголовок 6 уровня',
            inactiveIcon: 'H6',
            activeIcon: 'H6',
            type: BlockTypes.H6,
            actionType: ActionType.BLOCK,
        },
    ],
};

export const buttonsConfig: ConfigItemType[][] = [
    [
        {
            title: 'Степень',
            type: InlineStyleTypes.SUPERSCRIPT,
            activeIcon: <IconSuper size={IconSize.SM} />,
            inactiveIcon: <IconSuper size={IconSize.SM} />,
            actionType: ActionType.INLINE,
            disabledTypes: DISABLED_CUSTOM_BLOCKS,
        },
        {
            title: 'Жирный',
            type: InlineStyleTypes.BOLD,
            activeIcon: <IconBold size={IconSize.SM} />,
            inactiveIcon: <IconBold size={IconSize.SM} />,
            actionType: ActionType.INLINE,
            disabledTypes: DISABLED_CUSTOM_BLOCKS,
        },
        {
            title: 'Курсив',
            type: InlineStyleTypes.ITALIC,
            activeIcon: <IconItalic size={IconSize.SM} />,
            inactiveIcon: <IconItalic size={IconSize.SM} />,
            actionType: ActionType.INLINE,
            disabledTypes: DISABLED_CUSTOM_BLOCKS,
        },
        {
            title: 'Зачеркнутый',
            type: InlineStyleTypes.STRIKETHROUGH,
            activeIcon: <IconStrike size={IconSize.SM} />,
            inactiveIcon: <IconStrike size={IconSize.SM} />,
            actionType: ActionType.INLINE,
            disabledTypes: DISABLED_CUSTOM_BLOCKS,
        },
        {
            renderType: RenderType.LIST,
            defaultIcon: <IconLink size={IconSize.SM} />,
            buttons: [
                {
                    title: 'Ссылка',
                    inactiveIcon: <IconLink size={IconSize.SM} />,
                    activeIcon: <IconLink size={IconSize.SM} />,
                    type: EntityTypes.LINK,
                    actionType: ActionType.ENTITY,
                    disabledTypes: DISABLED_CUSTOM_BLOCKS,
                    selectionType: SelectionType.LINK_INPUT,
                },
            ],
        },
    ],
    [
        headingBlock,
        {
            title: 'Цитата',
            type: BlockTypes.BLOCKQUOTE,
            inactiveIcon: <IconBlockquote size={IconSize.SM} />,
            activeIcon: <IconBlockquote size={IconSize.SM} />,
            actionType: ActionType.BLOCK,
            disabledTypes: DISABLED_INLINE_BLOCKS,
        },
        {
            title: 'Вывод',
            type: BlockTypes.CONCLUSION,
            inactiveIcon: <IconConclusion size={IconSize.SM} />,
            activeIcon: <IconConclusion size={IconSize.SM} />,
            actionType: ActionType.BLOCK,
            disabledTypes: DISABLED_INLINE_BLOCKS,
        },
    ],
    [
        {
            title: 'Маркированный спиок',
            type: BlockTypes.UL,
            inactiveIcon: <IconNumericList size={IconSize.SM} />,
            activeIcon: <IconNumericList size={IconSize.SM} />,
            actionType: ActionType.BLOCK,
        },
        {
            title: 'Нумерованный список',
            type: BlockTypes.OL,
            inactiveIcon: <IconOrderedList size={IconSize.SM} />,
            activeIcon: <IconOrderedList size={IconSize.SM} />,
            actionType: ActionType.BLOCK,
        },
    ],
];
