import type { FC } from 'react';

import React, {
    useState,
} from 'react';

import Box from '@mui/material/Box';

import { EntityTypes } from '@/constants/EntityTypes';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';
import { BlockTypes } from '@/constants/BlockTypes';

import InlineToolbar from '../InlineToolbar';
import { ActionType } from '../constants';

import type {
    BlockButtonType,
    SelectedBlockType,
} from '../types';

const Demo: FC = () => {
    const [selectedBlockItem, setSelectedBlockItem] = useState<BlockButtonType>();
    const [selectedInlineItem, setSelectedInlineItem] = useState<BlockButtonType>();
    const [selectedEntityItem, setSelectedEntityItem] = useState<BlockButtonType>();

    const handleItemSelect = (data: SelectedBlockType) => {
        if (data.actionType === ActionType.BLOCK) {
            setSelectedBlockItem(
                (item) => (data.type === item
                    ? undefined
                    : data.type
                ),
            );
            return;
        }

        if (data.actionType === ActionType.INLINE) {
            setSelectedInlineItem(
                (item) => (data.type === item
                    ? undefined
                    : data.type
                ),
            );
            return;
        }

        if (data.actionType === ActionType.ENTITY) {
            setSelectedEntityItem(
                (item) => (data.type === item
                    ? undefined
                    : data.type
                ),
            );
        }
    };

    const selectedButtons = [
        selectedBlockItem,
        selectedEntityItem,
        selectedInlineItem,
    ].filter(Boolean) as BlockButtonType[];

    return (
      <Box sx={{ p: 5 }}>
        <InlineToolbar
          availableButtons={[
                    BlockTypes.H1,
                    BlockTypes.H2,
                    BlockTypes.H3,
                    BlockTypes.H4,
                    BlockTypes.H5,
                    BlockTypes.H6,
                    BlockTypes.BLOCKQUOTE,
                    BlockTypes.CONCLUSION,
                    BlockTypes.OL,
                    BlockTypes.UL,
                    EntityTypes.LINK,
                    InlineStyleTypes.BOLD,
                    InlineStyleTypes.SUPERSCRIPT,
                    InlineStyleTypes.STRIKETHROUGH,
                    InlineStyleTypes.ITALIC,
                ]}
          selectedButtons={selectedButtons}
          onToggle={handleItemSelect}
        />
      </Box>
    );
};

export {
    Demo,
};

export default {
    title: 'Components/InlineToolbar',
};
