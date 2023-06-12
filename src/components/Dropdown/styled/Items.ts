import styled from '@emotion/styled';
import { css } from '@emotion/react';

const getContainerStyles = ({
    position,
}: {
    position: 'left' | 'right';
}) => css`
    position: absolute;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 5px 25px rgba(30, 31, 33, 0.12);
    background: #fff;
    top: 0;
    z-index: 100;

    ${position === 'right' && css`
        left: 100%
    `}

    ${position === 'left' && css`
        left: 0;
        transform: translateX(-100%);
    `}
`;

export default styled('div')([
    getContainerStyles,
]);
