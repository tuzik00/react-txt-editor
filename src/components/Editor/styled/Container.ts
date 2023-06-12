import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { ThemeOptions } from '@mui/material';

interface ContainerPropTypes {
    maxHeight?: number;
    isShowAside?: boolean;
    theme?: ThemeOptions;
}

const defaultStyles = css`
    position: relative;
`;

const scrollStyles = ({
    maxHeight,
}: ContainerPropTypes) => {
    if (!maxHeight) {
        return '';
    }

    return css`
        overflow-x: auto;
        max-height: ${maxHeight}px;
    `;
};

const asideStyles = ({
    isShowAside = true,
    theme,
}: ContainerPropTypes) => {
    if (!isShowAside) {
        return '';
    }

    return css`
        padding-left: 33px;

        ${theme?.breakpoints?.up?.('tablet')} {
            padding-left: 60px;
        }
    `;
};

export default styled('div')([
    defaultStyles,
    asideStyles,
    scrollStyles,
]);
