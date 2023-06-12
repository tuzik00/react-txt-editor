import type {
    ComponentType,
    FC,
} from 'react';

import React from 'react';

import orderBy from 'lodash/orderBy';

import { IconSize } from '../constants';
import type { IconProps } from '../types';

import * as icons from '../list';

import {
    IconsListContainer,
    IconWrapper,
    IconWrapperName,
} from './components';

type IconsList = {
    [iconName: string]: ComponentType<IconProps>;
};

const iconsList = orderBy(
    Object.keys(icons).map((icon) => ({
        name: icon,
        component: (icons as IconsList)[icon],
    })),
    ['name'],
);

const renderIconsList = (): JSX.Element[] => iconsList.map((icon) => {
    const IconComponent = icon.component as unknown as FC<IconProps>;

    return (
      <IconWrapper
        key={icon.name}
        style={{ color: 'orange' }}
      >
        <IconWrapperName>
          {icon.name}
        </IconWrapperName>

        <IconComponent
          size={IconSize.M}
          isDisabledFill
        />
      </IconWrapper>
    );
});

const Icons: FC = () => (
  <>
    <IconsListContainer>
      {renderIconsList()}
    </IconsListContainer>
  </>
);

export default Icons;
