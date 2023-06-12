import type { Ref } from 'react';

import React, {
    memo,
    useState,
    useMemo,
    useEffect,
    forwardRef,
} from 'react';

import OutsideClickHandler from 'react-outside-click-handler';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import {
    IconAdd,
    IconSize,
} from '@/components/Icons';

import { ButtonStyled } from './styled';
import type { BlockToolbarPropsType } from './types';

const BlockToolbar = forwardRef<HTMLDivElement, BlockToolbarPropsType>(({
    onClick = () => {},
    onToggle = () => {},
    renderButton = (element) => element,
    buttons = [],
}, forwardedRef: Ref<HTMLDivElement>) => {
    const [isOpenToolbar, setOpenToolbar] = useState(false);

    useEffect(
        () => {
            onToggle(isOpenToolbar);
        },
        [
            isOpenToolbar,
            onToggle,
        ],
    );

    const buttonsList = useMemo(
        () => buttons.map((button, index) => {
            const key = `button_${index}`;

            return renderButton(
              <Tooltip
                key={key}
                title={button?.title ?? ''}
              >
                <ButtonStyled
                  color={'secondary'}
                  onClick={() => {
                            onClick(button);
                            setOpenToolbar(false);
                        }}
                >
                  {button.label}
                </ButtonStyled>
              </Tooltip>,
                button,
            );
        }),
        [
            buttons,
            onClick,
            renderButton,
        ],
    );

    return (
      <OutsideClickHandler
        display={'inline'}
        onOutsideClick={() => {
                setOpenToolbar(false);
            }}
      >
        <Box
          ref={forwardedRef}
          sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                }}
        >
          <ButtonStyled
            isOpen={isOpenToolbar}
            color={'secondary'}
            onClick={() => {
                        setOpenToolbar(!isOpenToolbar);
                    }}
          >
            <IconAdd size={IconSize.M} />
          </ButtonStyled>

          {isOpenToolbar && (
            <>
              <Divider
                orientation={'vertical'}
                variant={'middle'}
                flexItem
              />

              {buttonsList}
            </>
                )}
        </Box>
      </OutsideClickHandler>
    );
});

export default memo(BlockToolbar);
