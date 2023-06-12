import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { IconProps } from './types';

import {
    IconSize,
    IconSizes,
} from './constants';

const getIconSize = (size?: IconSize): string => (size ? IconSizes[size] : IconSizes[IconSize.M]);

const getIconContainerStyles = ({
    size = IconSize.M,
    isDisabledFill = false,
    isEnabledStrokeColoring = false,
}: IconProps) => css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${getIconSize(size)};
    height: ${getIconSize(size)};

    svg {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    g,
    path,
    ellipse,
    circle,
    rect {
        ${isDisabledFill ? '' : 'fill: currentColor;'};
        ${isEnabledStrokeColoring ? 'stroke: currentColor;' : ''}
    }
`;

const IconContainer = styled('span')(getIconContainerStyles);

export default IconContainer;
