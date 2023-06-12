import type {
    ChangeEvent,
    FC,
} from 'react';

import React, {
    memo,
    useRef,
    useCallback,
} from 'react';

import { nanoid } from 'nanoid';

import { LabelUploadStyled } from './styled';

import {
    InputFileAccepts,
    StaticId,
} from './constants';

export interface FileLoaderPropsType {
    onChange: (files: FileList | null) => void;
}

const FileLoader: FC<FileLoaderPropsType> = ({
    onChange,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const id = `${StaticId}-${nanoid(5)}`;

    const handleChangeFile = useCallback(
        ({
            target: { files },
        }: ChangeEvent<HTMLInputElement>) => {
            onChange(files);
        },
        [
            onChange,
        ],
    );

    return (
      <LabelUploadStyled htmlFor={id}>
        <input
          ref={fileInputRef}
          id={id}
          type={'file'}
          accept={InputFileAccepts}
          style={{ display: 'none' }}
          onChange={handleChangeFile}
        />
      </LabelUploadStyled>
    );
};

FileLoader.displayName = 'FileLoader';

export default memo(FileLoader);
