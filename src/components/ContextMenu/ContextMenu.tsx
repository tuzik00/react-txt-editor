import type { FC } from 'react';

import React, {
    memo,
    useMemo,
} from 'react';

import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import type { ThemeOptions } from '@mui/material';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import {
    IconHorizontalDotted,
    IconSize,
} from '@/components/Icons';

import { Dropdown } from '@/components/Dropdown';

import ContainerStyled from './styled/Container';
import MenuContainerStyled from './styled/MenuContainer';
import MobileButtonStyled from './styled/MobileButton';

import type { ContextMenuPropsType } from './types';

const ContextMenu: FC<ContextMenuPropsType> = ({
    children,
    itemsList = [],
    isShow = true,
}) => {
    const theme = useTheme() as ThemeOptions;
    const isMobile = useMediaQuery(theme?.breakpoints?.down?.('tablet') || '');

    const renderMobileIcons = useMemo(
        () => itemsList.map((item) => (
          <MobileButtonStyled onClick={item.action}>
            {item.icon || item.title}
          </MobileButtonStyled>
        )),
        [
            itemsList,
        ],
    );

    if (!isShow) {
        return children;
    }

    return (
      <ContainerStyled>
        {children}

        <MenuContainerStyled>
          <Box
            sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
          >
            {isMobile
                        ? renderMobileIcons
                        : (
                          <Dropdown
                            items={itemsList}
                            position={'left'}
                          >
                            <IconButton size={'small'}>
                              <IconHorizontalDotted
                                size={IconSize.SM}
                                style={{
                                            color: '#fff',
                                        }}
                              />
                            </IconButton>
                          </Dropdown>
                        )}
          </Box>
        </MenuContainerStyled>
      </ContainerStyled>
    );
};

export default memo(ContextMenu);
