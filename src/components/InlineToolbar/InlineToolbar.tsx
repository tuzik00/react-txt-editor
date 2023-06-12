import type { ReactNode } from 'react';

import React, {
    memo,
    useState,
    useCallback,
    Fragment,
    forwardRef,
    useMemo,
} from 'react';

import noop from 'lodash/noop';
import uniq from 'lodash/uniq';
import { Tooltip } from '@mui/material';

import { EntityTypes } from '@/constants/EntityTypes';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';
import { BlockTypes } from '@/constants/BlockTypes';

import DividerStyled from './styled/Divider';
import IconButtonStyled from './styled/IconButton';
import InlineToolbarContainerStyled from './styled/InlineToolbarContainer';

import { buttonsConfig } from './config';

import {
    SelectionType,
    RenderType,
    LIST_MIN_COUNT,
} from './constants';

import type {
    InlineToolbarPropsType,
    SelectItemType,
    ConfigItemType,
    BlockButtonType,
} from './types';

import AnchorLink from './AnchorLink';
import MenuButton from './MenuButton';

const InlineToolbar = forwardRef<HTMLDivElement, InlineToolbarPropsType>(({
    selectedButtons,
    availableButtons = [
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
    ],
    onToggle = noop,
}, ref) => {
    const [selectedItem, setSelectedItem] = useState<SelectItemType | null>(null);

    const disabledButtonTypes = useMemo(
        () => buttonsConfig
            .flat()
            .flatMap((configItem) => {
                if (configItem.renderType === RenderType.LIST) {
                    return configItem.buttons;
                }

                return configItem;
            })
            .filter(({ type: blockType }) => selectedButtons.includes(blockType))
            .reduce<BlockButtonType[]>(
                (acc, currentItem) => uniq([
                    ...acc,
                    ...(currentItem.disabledTypes || []),
                ]),
                [],
            ),
        [
            selectedButtons,
        ],
    );

    const handleButtonSelect = useCallback(
        (item: SelectItemType, isActive?: boolean) => {
            const {
                type,
                selectionType,
                actionType,
            } = item;

            const isSelectedLink = selectionType && Object.values(SelectionType)
                .filter((currentItem) => currentItem !== SelectionType.DEFAULT)
                .includes(selectionType);

            if (isSelectedLink && !isActive) {
                setSelectedItem(item);
                return;
            }

            onToggle({
                actionType,
                type,
            });
        },
        [
            onToggle,
        ],
    );

    const handleSingleButtonSelect = useCallback(
        (item: SelectItemType, isActive?: boolean) => () => handleButtonSelect(item, isActive),
        [
            handleButtonSelect,
        ],
    );

    const handleLinkSelect = useCallback(
        (url?: string) => {
            onToggle({
                actionType: selectedItem?.actionType,
                type: selectedItem?.type,
                data: { url },
            });

            setSelectedItem(null);
        },
        [
            onToggle,
            selectedItem,
        ],
    );

    const handleCustomNodeClose = useCallback(
        () => {
            setSelectedItem(null);
        },
        [],
    );

    const renderSingleButton = useCallback(
        (item: SelectItemType) => {
            const {
                type,
                activeIcon,
                inactiveIcon,
                title,
            } = item;

            const isActive = selectedButtons.includes(type);

            if (availableButtons.length > 0 && !availableButtons.includes(type)) {
                return null;
            }

            return (
              <Tooltip
                key={type}
                title={title}
              >
                <IconButtonStyled
                  color={isActive ? 'primary' : 'secondary'}
                  disabled={disabledButtonTypes.includes(type)}
                  onClick={handleSingleButtonSelect(item, isActive)}
                >
                  {isActive ? activeIcon : inactiveIcon}
                </IconButtonStyled>
              </Tooltip>
            );
        },
        [
            availableButtons,
            disabledButtonTypes,
            handleSingleButtonSelect,
            selectedButtons,
        ],
    );

    const getCustomNode = useCallback(
        () => {
            if (!selectedItem) {
                return null;
            }

            return (
              <AnchorLink
                onSelect={handleLinkSelect}
                onClose={handleCustomNodeClose}
              />
            );
        },
        [
            selectedItem,
            handleLinkSelect,
            handleCustomNodeClose,
        ],
    );

    const renderButton = useCallback(
        (item: ConfigItemType, index: number): ReactNode => {
            const buttonKey = `button_key_${index}`;

            switch (item.renderType) {
                case RenderType.LIST: {
                    const avaliableBlockButtons = item.buttons
                        .filter(
                            (button) => (
                                availableButtons.length > 0
                                && availableButtons.includes(button.type)
                            ),
                        );

                    if (avaliableBlockButtons.length === 0) {
                        return null;
                    }

                    if (avaliableBlockButtons.length <= LIST_MIN_COUNT) {
                        return (
                          <>
                            {avaliableBlockButtons.map(renderSingleButton)}
                          </>
                        );
                    }

                    return (
                      <MenuButton
                        key={buttonKey}
                        item={item}
                        availableButtons={availableButtons}
                        selectedButtons={selectedButtons}
                        onSelect={handleButtonSelect}
                      />
                    );
                }

                default: {
                    return renderSingleButton(item);
                }
            }
        },
        [
            availableButtons,
            handleButtonSelect,
            renderSingleButton,
            selectedButtons,
        ],
    );

    const buttonsNode = buttonsConfig
        .map((buttons) => buttons.map(renderButton).filter(Boolean))
        .filter((buttons) => buttons.length > 0)
        .map((buttons, index, resultMenuButtons) => {
            const groupKey = `group_${index}`;
            const isRenderDivider = index < resultMenuButtons.length - 1;

            return (
              <Fragment key={groupKey}>
                {buttons}

                {isRenderDivider && (
                <DividerStyled
                  flexItem
                  variant={'middle'}
                  orientation={'vertical'}
                />
                    )}
              </Fragment>
            );
        });

    return (
      <InlineToolbarContainerStyled
        ref={ref}
        direction={'row'}
        columnGap={'1'}
      >
        {selectedItem
                ? getCustomNode()
                : buttonsNode}
      </InlineToolbarContainerStyled>
    );
});

export default memo(InlineToolbar);
