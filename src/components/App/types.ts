import { BlockType } from '@/utils/blocksConverter/types';
import type { EditorPropsType } from '@/components/Editor/types';

export type AppStateType = BlockType[] | string;

export type AppPropsType = Omit<EditorPropsType, 'state' | 'onChange'> & {
  onChange?: (data: AppStateType) => void;
  state?: AppStateType
};
