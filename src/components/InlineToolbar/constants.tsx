import React from 'react';

import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AddLinkIcon from '@mui/icons-material/AddLink';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import LinkOffIcon from '@mui/icons-material/LinkOff';

import { EntityTypes } from '@/constants/EntityTypes';
import { BlockTypes } from '@/constants/BlockTypes';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';
import { ActionType } from './hooks/useInlineToolbar/constants';

export const URL_REGEXP = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';

export enum GroupTypes {
  HEADING,
  INLINE,
  LINK,
  BLOCK,
}

export const configButtons = [
  {
    group: GroupTypes.HEADING,
    buttons: [
      {
        inactiveIcon: 'H1',
        activeIcon: 'H1',
        type: BlockTypes.H1,
        actionType: ActionType.BLOCK,
      },
      {
        inactiveIcon: 'H2',
        activeIcon: 'H2',
        type: BlockTypes.H2,
        actionType: ActionType.BLOCK,
      },
      {
        inactiveIcon: 'H3',
        activeIcon: 'H3',
        type: BlockTypes.H3,
        actionType: ActionType.BLOCK,
      },
      {
        inactiveIcon: 'H4',
        activeIcon: 'H4',
        type: BlockTypes.H4,
        actionType: ActionType.BLOCK,
      },
      {
        inactiveIcon: 'H5',
        activeIcon: 'H5',
        type: BlockTypes.H5,
        actionType: ActionType.BLOCK,
      },
      {
        inactiveIcon: 'H6',
        activeIcon: 'H6',
        type: BlockTypes.H6,
        actionType: ActionType.BLOCK,
      },
    ],
  },
  {
    group: GroupTypes.INLINE,
    buttons: [
      {
        inactiveIcon: <FormatBoldIcon />,
        activeIcon: <FormatBoldIcon />,
        type: InlineStyleTypes.BOLD,
        actionType: ActionType.INLINE,
      },
      {
        inactiveIcon: <FormatItalicIcon />,
        activeIcon: <FormatItalicIcon />,
        type: InlineStyleTypes.ITALIC,
        actionType: ActionType.INLINE,
      },
      {
        inactiveIcon: <StrikethroughSIcon />,
        activeIcon: <StrikethroughSIcon />,
        type: InlineStyleTypes.STRIKETHROUGH,
        actionType: ActionType.INLINE,
      },
    ],
  },
  {
    group: GroupTypes.LINK,
    buttons: [
      {
        inactiveIcon: <AddLinkIcon />,
        activeIcon: <LinkOffIcon />,
        type: EntityTypes.LINK,
        actionType: ActionType.ENTITY,
      },
    ],
  },
  {
    group: GroupTypes.BLOCK,
    buttons: [
      {
        inactiveIcon: <FormatListBulletedIcon />,
        activeIcon: <FormatListBulletedIcon />,
        type: BlockTypes.UL,
        actionType: ActionType.BLOCK,
      },
      {
        inactiveIcon: <FormatListNumberedIcon />,
        activeIcon: <FormatListNumberedIcon />,
        type: BlockTypes.OL,
        actionType: ActionType.BLOCK,
      },
      {
        inactiveIcon: <FormatQuoteIcon />,
        activeIcon: <FormatQuoteIcon />,
        type: BlockTypes.BLOCKQUOTE,
        actionType: ActionType.BLOCK,
      },
    ],
  },
];
