import type { ReactElement } from 'react';

export type MenuType = {
  action: () => void;
  title: string;
  icon: ReactElement;
};

export type BlockOptionsPropsType = {
  menuList: MenuType[];
  children: ReactElement;
};
