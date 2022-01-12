import { EditorBlockRenderMapType } from '../..';
import * as TestBlock from './blocks/TestBlock';

export const blockRenderMap: EditorBlockRenderMapType = {
  [TestBlock.BlockName]: TestBlock.module,
};
