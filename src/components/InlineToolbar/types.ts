import type { ReactNode } from 'react';

import type { EntityTypes } from '@/constants/EntityTypes';
import type { InlineStyleTypes } from '@/constants/InlineStyleTypes';
import type { BlockTypes } from '@/constants/BlockTypes';

import type {
    ActionType,
    RenderType,
    SelectionType,
} from './constants';

export type InlineToolbarPropsType = {
    selectedButtons: BlockButtonType[];
    availableButtons?: BlockButtonType[];
    onToggle?: (blockData: SelectedBlockType) => void;
};

export interface AnchorLinkPropsType {
    isRenderClose?: boolean;
    onSelect: (link: string) => void;
    onClose?: () => void;
}

export interface OnImageSelectParamsType {
    url?: string;
    file?: File;
}

export interface ImageSelectPropsType {
    onSelect: (params: OnImageSelectParamsType) => void;
    onClose: () => void;
}

export interface YoutubeLinkPropsType {
    onSelect: (link: string) => void;
    onClose: () => void;
}

export interface MenuButtonPropsType {
    item: ConfigListItem;
    availableButtons: BlockButtonType[];
    selectedButtons: BlockButtonType[];
    onSelect: (item: SelectItemType) => void;
}

export interface FileSelectPropsType {
    onSelect: (file: File) => void;
    onClose?: () => void;
}

export interface SelectedBlockData {
    url?: string;
    file?: File;
}

export interface SelectedBlockType {
    actionType: ActionType;
    type: BlockButtonType;
    data?: SelectedBlockData;
}

export interface SelectItemType {
    inactiveIcon: ReactNode;
    activeIcon: ReactNode;
    type: BlockButtonType;
    actionType: ActionType;
    title: string;
    disabledTypes?: BlockButtonType[];
    selectionType?: SelectionType;
}

export interface ConfigListItem {
    renderType: RenderType.LIST;
    defaultIcon: ReactNode;
    buttons: SelectItemType[];
}

export interface ConfigSingleItem extends SelectItemType {
    renderType?: RenderType.SINGLE;
}

export type ConfigItemType = ConfigSingleItem | ConfigListItem;
export type BlockButtonType = BlockTypes | InlineStyleTypes | EntityTypes;
