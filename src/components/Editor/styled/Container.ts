import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Default = css`
  position: relative;
`;

const Aside = ({
  isShowAside = true,
}: { isShowAside?: boolean }) => {
  if (!isShowAside) {
    return '';
  }

  return css`
    padding-left: 60px;
  `;
};

export default styled('div')([
  Aside,
  Default,
]);
