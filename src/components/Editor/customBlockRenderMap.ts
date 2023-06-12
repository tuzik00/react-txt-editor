import { BlockTypes } from '@/constants/BlockTypes';

import getVideoRoot from './blocks/YoutubeVideo';
import type { YoutubeVideoRootPropsType } from './blocks/YoutubeVideo';

import getImageRoot from './blocks/Image';
import type { ImageRootPropsType } from './blocks/Image';

export type GetCustomBLockRenderPropsType = ImageRootPropsType & YoutubeVideoRootPropsType;

export const getCustomBlockRenderMap = ({
    onUploadImage,
    renderImage,
    renderYoutubeVideo,
}: GetCustomBLockRenderPropsType) => ({
    [BlockTypes.YOUTUBE]: getVideoRoot({ renderYoutubeVideo }),
    [BlockTypes.IMAGE]: getImageRoot({ onUploadImage, renderImage }),
});
