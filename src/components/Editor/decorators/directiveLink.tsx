import type { FC } from 'react';
import React from 'react';

import { EntityTypes } from '@/constants/EntityTypes';

import { useEditor } from '../hooks/useEditor';

import type {
    ComponentPropsType,
    StrategyFnType,
} from './types';

type EntityDataType = {
    href: string;
    title: string;
    classNames: string;
    id: string;
    variant: string;
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

            return entityType === EntityTypes.DIRECTIVE_LINK;
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
        href,
        title,
        classNames,
        id,
        variant,
    } = contentState
        .getEntity(entityKey)
        .getData() as EntityDataType;

    const DirectiveLink = mergeEntityMap[EntityTypes.DIRECTIVE_LINK];

    if (!DirectiveLink) {
        return null;
    }

    return (
      <DirectiveLink
        href={href}
        title={title}
        classNames={classNames}
        id={id}
        variant={variant}
      >
        {children}
      </DirectiveLink>
    );
};

export default {
    strategy,
    component: Component,
};
