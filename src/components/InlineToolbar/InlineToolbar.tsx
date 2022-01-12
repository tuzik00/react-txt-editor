import React, {
  Fragment,
  FC,
  memo,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { EntityTypes } from '@/constants/EntityTypes';
import { ActionType } from './hooks/useInlineToolbar/constants';

import { configButtons, GroupTypes, URL_REGEXP } from './constants';

import type { InlineToolbarPropsType } from './types';

const urlRegexp = new RegExp(URL_REGEXP, 'i');

const InlineToolbar: FC<InlineToolbarPropsType> = ({
  onToggle = () => {},
  selection = [],
  allowTypes = [],
}) => {
  const [isOpenLink, setOpenLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const [headingAnchorEl, setHeadingAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpenHeading = Boolean(headingAnchorEl);

  const isValidLintUrl = useMemo(
    () => linkUrl.length < 2083 && urlRegexp.test(linkUrl),
    [
      linkUrl,
    ],
  );

  const handleShowHeading = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setHeadingAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleCloseHeading = useCallback(
    () => {
      setHeadingAnchorEl(null);
    },
    [],
  );

  const renderLink = useMemo(
    () => (
      <Box sx={{ display: 'flex', m: 1 }}>
        <IconButton
          size={'small'}
          sx={{ mr: 1 }}
          onClick={() => {
            setOpenLink(false);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <TextField
          fullWidth
          placeholder={'Введите адрес ссылки'}
          size={'small'}
          sx={{ mr: 1 }}
          autoFocus
          error={linkUrl.length > 0 && !isValidLintUrl}
          onChange={(e) => {
            setLinkUrl(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.code === 'Enter') {
              onToggle({
                actionType: ActionType.ENTITY,
                type: EntityTypes.LINK,
                data: { url: linkUrl },
              });

              setOpenLink(false);
            }
          }}
        />
        <IconButton
          size={'small'}
          disabled={!isValidLintUrl}
          onClick={() => {
            onToggle({
              actionType: ActionType.ENTITY,
              type: EntityTypes.LINK,
              data: { url: linkUrl },
            });

            setOpenLink(false);
          }}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
    ),
    [
      isValidLintUrl,
      linkUrl,
      onToggle,
    ],
  );

  const renderButtons = useMemo(
    () => configButtons.reduce<Array<(ReactElement | null)[]>>((result, item) => {
      switch (item.group) {
        case GroupTypes.HEADING: {
          const menuItems = item.buttons.map((button) => {
            if (allowTypes.length > 0 && !allowTypes.includes(button.type)) {
              return null;
            }

            return (
              <MenuItem
                key={button.type}
                selected={selection?.includes(button.type)}
                onClick={() => {
                  onToggle({
                    actionType: button.actionType,
                    type: button.type,
                  });

                  handleCloseHeading();
                }}
              >
                {selection.includes(button.type as never)
                  ? button.activeIcon
                  : button.inactiveIcon}
              </MenuItem>
            );
          }).filter(Boolean);

          if (menuItems.length === 0) {
            break;
          }

          const isActive = item.buttons.some((button) => selection?.includes(button.type));

          result.push([
            <IconButton
              key={'heading-button-key'}
              id={'heading-positioned-button'}
              color={isActive ? 'primary' : 'default'}
              aria-controls={isOpenHeading ? 'heading-positioned-menu' : undefined}
              aria-haspopup={'true'}
              aria-expanded={isOpenHeading ? 'true' : undefined}
              size={'small'}
              sx={{ p: 0 }}
              onClick={handleShowHeading}
            >
              <TextFieldsIcon />
            </IconButton>,
            <Menu
              key={'heading-menu-key'}
              id={'heading-positioned-menu'}
              aria-labelledby={'heading-positioned-button'}
              anchorEl={headingAnchorEl}
              open={isOpenHeading}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handleCloseHeading}
            >
              {menuItems}
            </Menu>,
          ]);

          break;
        }

        default: {
          result.push(item.buttons.map(({
            inactiveIcon,
            activeIcon,
            type,
            actionType,
          }, elementIndex) => {
            const elementKey = `element_${elementIndex}`;
            const isActive = selection.includes(type as never);

            if (allowTypes.length > 0 && !allowTypes.includes(type)) {
              return null;
            }

            return (
              <IconButton
                key={elementKey}
                size={'small'}
                sx={{ p: 0 }}
                color={isActive ? 'primary' : 'default'}
                onClick={() => {
                  if (item.group === GroupTypes.LINK) {
                    if (isActive) {
                      onToggle({
                        actionType,
                        type,
                      });
                    } else {
                      setOpenLink(true);
                    }
                  } else {
                    onToggle({
                      actionType,
                      type,
                    });
                  }
                }}
              >
                {isActive ? activeIcon : inactiveIcon}
              </IconButton>
            );
          }).filter(Boolean));

          break;
        }
      }

      return result;
    }, []),
    [
      allowTypes,
      handleCloseHeading,
      handleShowHeading,
      headingAnchorEl,
      isOpenHeading,
      onToggle,
      selection,
    ],
  );

  return (
    <Box
      sx={{
        width: 'fit-content',
        bgcolor: 'background.paper',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      {isOpenLink
        ? renderLink
        : (
          <Box
            sx={{
              display: 'flex',
              color: 'text.secondary',
              '& svg': {
                m: 1.5,
              },
              '& hr': {
                mx: 0.5,
              },
            }}
          >
            {renderButtons.map((buttons, buttonsIndex) => {
              const groupKey = `group_${buttonsIndex}`;

              return (
                <Fragment key={groupKey}>
                  {buttons}
                  {buttons.length > 0 && buttonsIndex + 1 < renderButtons.length && (
                    <Divider
                      orientation={'vertical'}
                      variant={'middle'}
                      flexItem
                    />
                  )}
                </Fragment>
              );
            })}
          </Box>
        )}
    </Box>
  );
};

export default memo(InlineToolbar);
