import type { ReactElement } from 'react';

import type { DropdownItemPropsType } from '@/components/Dropdown';

export type ContextMenuItemType = {
    action: () => void;
    text: string;
};

export type ContextMenuPropsType = {
    children: ReactElement;
    isShow?: boolean;
    itemsList: DropdownItemPropsType[];
};
