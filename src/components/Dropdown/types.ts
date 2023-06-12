import type {
    ReactNode,
    ReactElement,
} from 'react';

export interface DropdownItemPropsType {
    title: string;
    icon: ReactNode;
    action: () => void;
}

export interface DropdownPropsType {
    items: DropdownItemPropsType[];
    children: ReactElement;
    position?: 'left' | 'right';
}
