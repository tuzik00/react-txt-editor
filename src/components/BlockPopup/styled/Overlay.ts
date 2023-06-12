import styled from '@emotion/styled';
import { css } from '@emotion/react';

const getOverlayStyles = () => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export default styled('div')([
    getOverlayStyles,
]);
