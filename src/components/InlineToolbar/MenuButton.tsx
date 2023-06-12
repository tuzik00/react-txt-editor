import type { FC } from 'react';

import React, {
    useState,
    useCallback,
    memo,
} from 'react';

import {
    MenuItem,
    Menu,
    Box,
    Tooltip,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';

import type {
    SelectItemType,
    MenuButtonPropsType,
} from './types';

export const MenuButton: FC<MenuButtonPropsType> = ({
    item,
    selectedButtons,
    availableButtons,
    onSelect,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const {
        buttons,
        defaultIcon,
    } = item;

    const handleMenuOpen = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
            setIsMenuOpen(true);
        },
        [],
    );

    const handleMenuClose = useCallback(
        () => {
            setAnchorEl(null);
            setIsMenuOpen(false);
        },
        [],
    );

    const handleItemSelect = useCallback(
        (selectedItem: SelectItemType) => () => {
            onSelect(selectedItem);
            handleMenuClose();
        },
        [
            handleMenuClose,
            onSelect,
        ],
    );

    const menuItems = buttons.map((button) => {
        if (!availableButtons.includes(button.type)) {
            return null;
        }

        return (
          <Tooltip
            key={button.type}
            placement={'right'}
            title={button.title}
          >
            <MenuItem
              selected={selectedButtons?.includes(button.type)}
              onClick={handleItemSelect(button)}
            >
              {selectedButtons.includes(button.type)
                  ? button.activeIcon
                  : button.inactiveIcon}
            </MenuItem>
          </Tooltip>
        );
    });

    const isActive = buttons?.some((button) => selectedButtons?.includes(button.type));

    return (
      <Box>
        <IconButton
          key={'button-key'}
          id={'positioned-button'}
          color={isActive ? 'primary' : 'secondary'}
          aria-controls={isMenuOpen ? 'positioned-menu' : undefined}
          aria-haspopup={'true'}
          aria-expanded={isMenuOpen ? 'true' : undefined}
          onClick={handleMenuOpen}
        >
          {defaultIcon}
        </IconButton>

        <Menu
          key={'menu'}
          id={'positioned-menu'}
          aria-labelledby={'positioned-button'}
          anchorEl={anchorEl}
          open={isMenuOpen}
          anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
          transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
          onClose={handleMenuClose}
        >
          {menuItems}
        </Menu>
      </Box>
    );
};

export default memo(MenuButton);
