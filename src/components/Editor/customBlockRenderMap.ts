import { BlockTypes } from '@/constants/BlockTypes';

import getYoutubeVideo from './blocks/YoutubeVideo';
import getRutubeVideo from './blocks/RutubeVideo';
import getImageRoot from './blocks/Image';

import type { ElementType as YoutubeElementType } from './blocks/YoutubeVideo';
import type { ElementType as RutubeElementType } from './blocks/RutubeVideo';
import type { ElementType as ImageElementType } from './blocks/Image';

export type GetCustomBLockRenderPropsType = YoutubeElementType & ImageElementType & RutubeElementType;

export const getCustomBlockRenderMap = ({
    onUploadImage,
    renderImage,
    renderYoutubeVideo,
    renderRutubeVideo,
}: GetCustomBLockRenderPropsType) => ({
    [BlockTypes.IMAGE]: getImageRoot({ onUploadImage, renderImage }),
    [BlockTypes.RUTUBE]: getRutubeVideo({ renderRutubeVideo }),
    [BlockTypes.YOUTUBE]: getYoutubeVideo({ renderYoutubeVideo }),
});
