import type { FC } from 'react';

import React, {
    useState,
    useMemo,
} from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { BlockTypes } from '@/constants/BlockTypes';
import { EntityTypes } from '@/constants/EntityTypes';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';
import type { ContentSchemaType } from '@/utils/contentConverter';

import type { WithContentAdapterPropsType } from '../hocs/withContentAdapter';
import Editor, { getCustomBlockRenderMap } from '..';

import customBlock from './blocks/CustomBlock';

import mock from './mock';

const buttons = [
    BlockTypes.H1,
    BlockTypes.H2,
    BlockTypes.H3,
    BlockTypes.H4,
    BlockTypes.H5,
    BlockTypes.H6,
    BlockTypes.BLOCKQUOTE,
    BlockTypes.CONCLUSION,
    BlockTypes.OL,
    BlockTypes.UL,
    EntityTypes.LINK,
    InlineStyleTypes.BOLD,
    InlineStyleTypes.SUPERSCRIPT,
    InlineStyleTypes.STRIKETHROUGH,
    InlineStyleTypes.ITALIC,
];

const Demo: FC = () => {
    const [content] = useState<string | ContentSchemaType[]>(mock);
    const [contentType, setContentType] = useState('md');
    const [placeholder, setPlaceholder] = useState('Начните вводить текс');
    const [isDisabled, setDisabled] = useState(false);
    const [showDefaultBlocks, setShowDefaultBlocks] = useState(true);
    const [isShowContentView, setIsShowContentView] = useState(true);
    const [inlineToolbarAvailableButtons, setInlineToolbarAvailableButtons] = useState(buttons);

    const customBlocks = useMemo(
        () => (
            showDefaultBlocks
                ? {
                    ...getCustomBlockRenderMap({
                        onUploadImage: async () => {
                            await new Promise((res) => setTimeout(res, 1000));
                            return {
                                url: 'https://i.gifer.com/origin/00/00289d97d27522697379257e77162cc8.gif',
                            };
                        },
                        renderImage: (data) => (
                          <img
                            style={{ width: '100%' }}
                            src={data.url as string}
                            alt={data.alt as string}
                          />
                        ),
                        renderYoutubeVideo: (data) => (
                          <iframe
                            title={data.title as string}
                            style={{ width: '999px', maxWidth: '100%', height: '400px' }}
                            src={`https://www.youtube.com/embed/${data.id}`}
                            allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
                            allowFullScreen
                          />
                        ),
                    }),
                    customBlock,
                }
                : undefined
        ),
        [
            showDefaultBlocks,
        ],
    );

    return (
      <Box>
        <Box sx={{ display: 'flex' }}>
          <FormControl sx={{ width: '100%', pr: 2 }}>
            <FormLabel>
              {'contentType'}
            </FormLabel>

            <RadioGroup
              row
              defaultValue={'md'}
              onChange={(event, value) => {
                            setContentType(value);
                        }}
            >
              <FormControlLabel
                value={'md'}
                control={<Radio />}
                label={'md'}
              />

              <FormControlLabel
                value={'blocks'}
                control={<Radio />}
                label={'blocks'}
              />
            </RadioGroup>

            <FormLabel sx={{ mt: 2 }}>
              {'placeholder'}
            </FormLabel>

            <TextField
              size={'small'}
              defaultValue={placeholder}
              onChange={(e) => {
                            setPlaceholder(e.target.value);
                        }}
            />

            <FormLabel sx={{ mt: 2 }}>
              {'disabled'}
            </FormLabel>

            <FormControlLabel
              control={(
                <Checkbox
                  onChange={(e, isChecked) => {
                                    setDisabled(isChecked);
                                }}
                />
                        )}
              label={'Заблокировать/Разблокировать'}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  defaultChecked
                  onChange={(e, isChecked) => {
                                    setIsShowContentView(isChecked);
                                }}
                />
                        )}
              label={'Показать отображение контента'}
            />

            <FormLabel sx={{ mt: 2 }}>
              {'defaultBlocks'}
            </FormLabel>

            <FormControlLabel
              control={(
                <Checkbox
                  defaultChecked
                  onChange={(e, isChecked) => {
                                    setShowDefaultBlocks(isChecked);
                                }}
                />
                        )}
              label={'Показать/Скрыть'}
            />
          </FormControl>

          <FormControl sx={{ width: '100%', pl: 2 }}>
            <FormLabel>
              {'inlineToolbarAvailableButtons'}
            </FormLabel>

            <FormGroup row>
              {buttons.map((item, index) => {
                  const key = `controll_${index}`;

                  return (
                    <FormControlLabel
                      key={key}
                      value={item}
                      control={(
                        <Checkbox
                          defaultChecked
                          onChange={(e, isChecked) => {
                                  setInlineToolbarAvailableButtons((items) => {
                                      if (!isChecked) {
                                          return items.filter((i) => i !== item);
                                      }

                                      return [
                                          ...items,
                                          item,
                                      ];
                                  });
                              }}
                        />
                      )}
                      label={item}
                    />
              );
              })}
            </FormGroup>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', pt: 5 }}>
          <Box
            style={{ width: '100%' }}
            sx={{ pr: 1 }}
          >
            <Editor
              isAutoFocus
              isDisabled={isDisabled}
              placeholder={placeholder}
              contentType={contentType as WithContentAdapterPropsType['contentType']}
              content={content}
              blockRenderMap={customBlocks}
              inlineToolbarAvailableButtons={inlineToolbarAvailableButtons}
              onChange={() => {}}
            />
          </Box>

          {isShowContentView && (
            <Box
              style={{ width: '400px' }}
              sx={{ pl: 1 }}
            >
              <pre
                style={{
                                whiteSpace: 'pre-wrap',
                                width: '100%',
                                overflow: 'auto',
                            }}
              >
                {JSON.stringify(
                                content,
                                null,
                                2,
                            )}
              </pre>
            </Box>
                )}
        </Box>
      </Box>
    );
};

export {
    Demo,
};

export default {
    title: 'Components/Editor',
};
