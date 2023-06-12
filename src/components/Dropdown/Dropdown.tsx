import React, {
    useMemo,
    useCallback,
    useState,
} from 'react';

import type { FC } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';

import ContainerStyled from './styled/Container';
import ItemsStyled from './styled/Items';
import ItemStyled from './styled/Item';

import type { DropdownPropsType } from './types';

const Dropdown: FC<DropdownPropsType> = ({
    items,
    children,
    position = 'right',
}) => {
    const [isOpen, setOpen] = useState(false);

    const handleOpen = useCallback(
        () => {
            setOpen(!isOpen);
        },
        [
            isOpen,
        ],
    );

    const handleClose = useCallback(
        () => {
            setOpen(false);
        },
        [],
    );

    const elements = useMemo(
        () => items.map((item) => (
          <ItemStyled
            onClick={(e) => {
                    e.stopPropagation();

                    item.action();
                }}
          >
            {item.icon}

            {item.title}
          </ItemStyled>
        )),
        [
            items,
        ],
    );

    return (
      <OutsideClickHandler
        display={'block'}
        onOutsideClick={handleClose}
      >
        <ContainerStyled onClick={handleOpen}>
          {children}

          {isOpen && (
            <ItemsStyled position={position}>
              {elements}
            </ItemsStyled>
                )}
        </ContainerStyled>
      </OutsideClickHandler>
    );
};

export default Dropdown;
