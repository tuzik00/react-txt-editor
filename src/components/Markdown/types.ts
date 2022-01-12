import {
  ReactChildren,
  ReactElement,
} from 'react';

export type StyleBlockRenderMapType = {
  [key: string]: (props: { children: ReactChildren } & Record<string, unknown>) => ReactElement;
};

export type MarkdownPropsType = {
  content?: string;
  styleBlockRenderMap?: StyleBlockRenderMapType;
};
