import type { ReactElement } from 'react';

import type { DropdownItemPropsType } from '@/components/Dropdown';

export type BlockOptionsPropsType = {
    children: ReactElement;
    itemsList: DropdownItemPropsType[];
    isShow?: boolean;
};
