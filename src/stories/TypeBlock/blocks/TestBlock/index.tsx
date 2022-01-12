import React from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SetupElement from './SetupElement';
import Element from './Element';

import type { BlockConfigType } from '@/components/BlockToolbar/hooks/useBlockToolbar';

const BlockName = 'TestBlock';

const module: BlockConfigType = {
  label: 'Тестовый блок',
  isEditable: true,
  toolbarIcon: <AddBusinessIcon />,
  setupElement: ({ onCreate, data }) => (
    <SetupElement
      text={data?.text as string}
      onCreate={(text) => {
        onCreate({
          text,
        });
      }}
    />
  ),
  element: ({ data, setData, isReadonly }) => (
    <Element
      isReadonly={isReadonly}
      text={data?.text as string}
      onChange={(text) => {
        setData({
          text,
        });
      }}
    />
  ),
};

export {
  Element,
  SetupElement,
  BlockName,
  module,
};
