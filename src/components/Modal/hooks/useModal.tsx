import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from 'react';

import Context from '../context';

import type {
    ModalDataType,
    ModalRenderType,
} from '../types';

function useModal<DataType = unknown | ModalDataType>(
    render: ModalRenderType<DataType>,
) {
    const context = useContext(Context);

    const modalKey = useMemo(
        () => Math.random().toString(36),
        [],
    );

    const showModal = useCallback(
        (data?: DataType) => {
            context.show<DataType>(modalKey, data);
        },
        [
            modalKey,
            context,
        ],
    );

    const hideModal = useCallback(
        () => {
            context.hide(modalKey);
        },
        [
            context,
            modalKey,
        ],
    );

    useEffect(
        () => {
            context.setModal(
                modalKey,
                render as ModalRenderType,
            );
        },
        [
            context,
            render,
            modalKey,
        ],
    );

    return [showModal, hideModal];
}

export default useModal;
