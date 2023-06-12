import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface IconButtonPropsType {
    color: 'secondary' | 'primary';
    disabled: boolean;
}

const getDefaultStyles = ({ color, disabled }: IconButtonPropsType) => css`
  border-radius: 0;
  font-size: 18px;
  font-weight: 400;
  border: none;
  background-color: white;
  height: 42px;
  color: ${color === 'primary' ? '#FE7200' : 'inherit'};
  opacity: ${disabled ? 0.3 : 1};
  pointer-events: ${disabled ? 'none' : 'auto'};
  cursor: ${disabled ? 'none' : 'pointer'};;

  &:hover {
    background-color: #f6f6f7;
  }
`;

export default styled('button')(getDefaultStyles);
