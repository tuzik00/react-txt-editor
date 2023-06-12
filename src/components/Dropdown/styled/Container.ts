import styled from '@emotion/styled';
import { css } from '@emotion/react';

const getContainerStyles = () => css`
    position: relative;
    width: max-content;
`;

export default styled('div')([
    getContainerStyles,
]);
