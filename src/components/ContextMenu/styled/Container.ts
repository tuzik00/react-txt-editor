import styled from '@emotion/styled';
import { css } from '@emotion/react';

const getContainerStyles = () => css`
  position: relative;
  width: 100%;
`;

export default styled('div')([
    getContainerStyles,
]);
