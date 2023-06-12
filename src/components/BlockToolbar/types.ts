import type { ReactElement } from 'react';

export type BlockToolbarButtonType = {
    type: string;
    label: string | ReactElement;
    title?: string;
};

export type BlockToolbarPropsType = {
    onClick?: (button: BlockToolbarButtonType) => void;
    onToggle?: (isOpen: boolean) => void;
    renderButton?: (element: ReactElement, button: BlockToolbarButtonType) => ReactElement;
    buttons: BlockToolbarButtonType[];
};
