import React from 'react';
import Link from '@mui/material/Link';
import { EntityTypes } from '@/constants/EntityTypes';
import type { ComponentPropsType, StrategyPropsType } from './types';

type EntityDataType = {
  url: string;
};

export const strategy: StrategyPropsType = (
  contentBlock,
  callback,
  contentState,
) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();

      if (!entityKey) {
        return false;
      }

      const entityType = contentState
        .getEntity(entityKey)
        .getType();

      return entityType === EntityTypes.LINK;
    },
    callback,
  );
};

export const Component = ({
  children,
  contentState,
  entityKey,
}: ComponentPropsType): React.ReactNode => {
  const {
    url,
  } = contentState
    .getEntity(entityKey)
    .getData() as EntityDataType;

  return (
    <Link
      href={url}
      title={url}
    >
      {children}
    </Link>
  );
};

export default {
  strategy,
  component: Component,
};
