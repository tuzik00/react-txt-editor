import type {
    FC,
    DragEvent,
} from 'react';

import React, {
    memo,
    useCallback,
    useState,
} from 'react';

import {
    IconImg,
    IconSize,
} from '@/components/Icons';

import FileLoader from './FileLoader';

import {
    ContentWrapperStyled,
    ImageUploaderBoxStyled,
    ImageWrapperStyled,
    MessageStyled,
} from './styled';

interface ImageUploaderPropsType {
    onSubmit: (file: File | null) => Promise<void>;
}

const ImageUploader: FC<ImageUploaderPropsType> = ({
    onSubmit,
}) => {
    const [isDragEntered, setIsDragEntered] = useState(false);

    const handleDragOver = useCallback(
        (ev: DragEvent<HTMLDivElement>) => {
            ev.preventDefault();
        },
        [],
    );

    const handleDragEnter = useCallback(
        () => setIsDragEntered(true),
        [],
    );

    const handleDragLeave = useCallback(
        () => setIsDragEntered(false),
        [],
    );

    const handleFileChange = useCallback(
        async (files: FileList | null) => onSubmit(files ? [...files][0] : null),
        [
            onSubmit,
        ],
    );

    return (
      <ImageUploaderBoxStyled
        isDragEntered={isDragEntered}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <ContentWrapperStyled>
          <ImageWrapperStyled>
            <IconImg size={IconSize.L} />
          </ImageWrapperStyled>

          <MessageStyled>
            {'Нажмите на область, чтобы загрузить фото либо перетащите файл'}
          </MessageStyled>
        </ContentWrapperStyled>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <FileLoader onChange={handleFileChange} />
      </ImageUploaderBoxStyled>
    );
};

export default memo(ImageUploader);
