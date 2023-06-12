import styled from '@emotion/styled';
import { css } from '@emotion/react';

const getMenuContainerStyles = () => css`
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-100%);
`;

export default styled('div')([
    getMenuContainerStyles,
]);
