import React, {
    FC,
    ReactElement,
    useCallback,
    useMemo,
    useState,
} from 'react';

import Context from './context';

import type {
    ModalsType,
    ModalDataType,
    ModalRenderType,
    ModalProviderPropsType,
} from './types';

const Provider: FC<ModalProviderPropsType> = ({
    children,
}) => {
    const modals = useMemo<ModalsType>(
        () => ({}),
        [],
    );

    const [activeModal, setActiveModal] = useState<ReactElement>();

    const onHide = useCallback(
        (key) => {
            setActiveModal(modals[key as string]({
                isOpen: false,
                onClose: () => onHide(key),
                data: {},
            }));
        },
        [
            modals,
        ],
    );

    const onShow = useCallback(
        (key, data) => {
            setActiveModal(modals[key as string]({
                isOpen: true,
                onClose: () => onHide(key),
                data: data as ModalDataType,
            }));
        },
        [
            onHide,
            modals,
        ],
    );

    const setModal = useCallback(
        (key, render) => {
            modals[key as string] = render as ModalRenderType;
        },
        [
            modals,
        ],
    );

    const contextValue = useMemo(
        () => ({
            setModal,
            show: onShow,
            hide: onHide,
        }),
        [
            onHide,
            onShow,
            setModal,
        ],
    );

    return (
      <Context.Provider value={contextValue}>
        <>
          {children}

          {activeModal}
        </>
      </Context.Provider>
    );
};

export default Provider;
