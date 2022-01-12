import React, {
  FC,
  memo,
  useState,
  useCallback,
} from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';

import ContainerStyled from './styled/Container';
import MenuContainerStyled from './styled/MenuContainer';

import type { BlockOptionsPropsType } from './types';

const BlockOptions: FC<BlockOptionsPropsType> = ({
  children,
  menuList = [],
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(
    () => {
      setAnchorEl(null);
    },
    [],
  );

  return (
    <ContainerStyled>
      {children}
      <MenuContainerStyled>
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title={'Настройки'}>
              <IconButton
                size={'small'}
                sx={{ ml: 2 }}
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id={'account-menu'}
            open={open}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            onClose={handleClose}
            onClick={handleClose}
          >
            {menuList.map((menuItem) => (
              <MenuItem
                key={menuItem.title}
                onClick={menuItem.action}
              >
                <ListItemIcon>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText>
                  {menuItem.title}
                </ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      </MenuContainerStyled>
    </ContainerStyled>
  );
};

export default memo(BlockOptions);
