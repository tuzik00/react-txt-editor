import { css } from '@emotion/react';
import styled from '@emotion/styled';

const getDefaultStyles = () => css`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default styled.div(getDefaultStyles);
