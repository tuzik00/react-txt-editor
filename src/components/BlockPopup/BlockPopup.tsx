import type { FC } from 'react';

import React, {
    memo,
} from 'react';

import ContainerStyled from './styled/Container';
import PopupStyled from './styled/Popup';
import OverlayStyled from './styled/Overlay';

import type { BlockPopupPropsType } from './types';

const BlockPopup: FC<BlockPopupPropsType> = ({
    children,
    content,
    isOpen,
    onOverlayClick = () => {},
}) => (
  <ContainerStyled>
    {children}

    {content && isOpen ? (
      <>
        <PopupStyled>
          {content}
        </PopupStyled>

        <OverlayStyled onClick={onOverlayClick} />
      </>
        ) : null}
  </ContainerStyled>
);

export default memo(BlockPopup);
