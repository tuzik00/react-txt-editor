import type { FC } from 'react';
import React from 'react';

import { EntityTypes } from '@/constants/EntityTypes';

import { useEditor } from '../hooks/useEditor';

import type {
    ComponentPropsType,
    StrategyFnType,
} from './types';

type EntityDataType = {
    url: string;
};

const strategy: StrategyFnType = (
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

const Component: FC<ComponentPropsType> = ({
    children,
    contentState,
    entityKey,
}) => {
    const {
        mergeEntityMap,
    } = useEditor();

    const {
        url,
    } = contentState
        .getEntity(entityKey)
        .getData() as EntityDataType;

    const Link = mergeEntityMap[EntityTypes.LINK];

    if (!Link) {
        return null;
    }

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
