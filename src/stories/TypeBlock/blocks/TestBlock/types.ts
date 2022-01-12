export type ElementPropsType = {
  isReadonly?: boolean;
  text: string;
  onChange?: (val: string) => void;
};

export type SetupElementPropsType = {
  onCreate: (val: string) => void;
  text: string;
};
