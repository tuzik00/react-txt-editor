import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Aside = ({
  isShowAside = true,
}: { isShowAside?: boolean }) => {
  if (!isShowAside) {
    return '';
  }

  return css`
    position: relative;
    padding-left: 60px;
  `;
};

export default styled('div')([
  Aside,
]);
