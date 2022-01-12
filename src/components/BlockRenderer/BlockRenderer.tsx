import React, {
  FC,
  memo,
  useMemo,
} from 'react';

import validator from '@/utils/validator';

import type { BlockRendererPropsType } from './types';

const BlockRenderer: FC<BlockRendererPropsType> = ({
  state = [],
  blockRenderMap = {},
}) => {
  const blocksList = useMemo(
    () => {
      const validateState = validator.validateSync(state);

      if (!validateState) {
        return [];
      }

      return validateState;
    },
    [
      state,
    ],
  );

  const renderContent = useMemo(
    () => blocksList.map((block, index) => {
      const uniqKey = `block-${index}`;

      if (!blockRenderMap || !blockRenderMap[block.type]) {
        return null;
      }

      const customBlock = blockRenderMap[block.type];

      return (
        <React.Fragment key={uniqKey}>
          {customBlock?.wrapper
            ? React.cloneElement(customBlock.wrapper, {
              children: customBlock.element({
                data: block.data || {},
              }),
            })
            : customBlock.element({
              data: block.data || {},
            })}
        </React.Fragment>
      );
    }),
    [
      blockRenderMap,
      blocksList,
    ],
  );

  return (
    <>
      {renderContent}
    </>
  );
};

export default memo(BlockRenderer);
