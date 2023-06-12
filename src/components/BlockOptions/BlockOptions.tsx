import type { FC } from 'react';

import React, {
    memo,
} from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import {
    IconVerticalDotted,
    IconSize,
} from '@/components/Icons';

import { Dropdown } from '@/components/Dropdown';

import ContainerStyled from './styled/Container';
import MenuContainerStyled from './styled/MenuContainer';

import type { BlockOptionsPropsType } from './types';

const BlockOptions: FC<BlockOptionsPropsType> = ({
    children,
    itemsList,
    isShow = true,
}) => {
    if (!isShow) {
        return children;
    }

    return (
      <ContainerStyled>
        {children}

        <MenuContainerStyled>
          <Box
            sx={{
                pr: 1,
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
            }}
          >
            <Dropdown items={itemsList}>
              <IconButton size={'small'}>
                <IconVerticalDotted size={IconSize.SM} />
              </IconButton>
            </Dropdown>
          </Box>
        </MenuContainerStyled>
      </ContainerStyled>
    );
};

export default memo(BlockOptions);
