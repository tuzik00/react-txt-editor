import React, {
    memo,
} from 'react';

import type {
    SVGProps,
    FC,
} from 'react';

import IconContainer from '../components';
import type { IconProps } from '../types';

/**
 * Универсальная обертка для иконок
 */
const withStyledIcon = (WrappedComponent: FC<SVGProps<SVGElement>>): FC<IconProps> => {
    const WrappedIcon: FC<IconProps> = ({
        className,
        size,
        isDisabledFill = false,
        isEnabledStrokeColoring = false,
        style,
    }) => (
      <IconContainer
        className={className}
        isDisabledFill={isDisabledFill}
        isEnabledStrokeColoring={isEnabledStrokeColoring}
        size={size}
        style={style}
      >
        <WrappedComponent />
      </IconContainer>
    );

    WrappedIcon.displayName = 'Icon';

    return memo(WrappedIcon);
};

export default withStyledIcon;
