import { BlockTypes } from '@/constants/BlockTypes';

import getVideoRoot from './blocks/YoutubeVideo';
import getImageRoot from './blocks/Image';

import type { ElementType as YoutubeElementType } from './blocks/YoutubeVideo';
import type { ElementType as ImageElementType } from './blocks/Image';

export type GetCustomBLockRenderPropsType = YoutubeElementType & ImageElementType;

export const getCustomBlockRenderMap = ({
    onUploadImage,
    renderImage,
    renderYoutubeVideo,
}: GetCustomBLockRenderPropsType) => ({
    [BlockTypes.YOUTUBE]: getVideoRoot({ renderYoutubeVideo }),
    [BlockTypes.IMAGE]: getImageRoot({ onUploadImage, renderImage }),
});
