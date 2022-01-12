import { ContentBlock, ContentState } from 'draft-js';

export type StrategyPropsType = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
) => void;

export type ComponentPropsType = {
  children: string,
  contentState: ContentState,
  entityKey: string,
  decoratedText: string,
};
