import { ReactChild, ReactElement, ReactNode } from 'react';

export type ModalProviderPropsType = {
  children: ReactNode;
};

export type ModalPropsType = {
  title?: string;
  children: ReactChild | null;
  isOpen: boolean;
  onOutsideClick?: () => void;
};

export type ModalDataType = Record<string, unknown>;

export type UseConfirmPropsType<DataType> = {
  title: string;
  onConfirm: (data: DataType) => void;
};

export type ModalRenderType<DataType = ModalDataType> = (
  props: {
    isOpen: boolean,
    onClose: () => void,
    data: DataType,
  },
) => ReactElement;

export type ModalContextType = {
  setModal(key: string, render: ModalRenderType): void;
  show<DataType>(key: string, data?: DataType): void;
  hide(key: string): void;
};

export type ModalsType = {
  [key: string]: ModalRenderType;
};
