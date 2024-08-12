'use client'

import React from 'react'

import {
  IconAlignmentCenter,
  IconAlignmentCenterFill,
  IconAlignmentJustify,
  IconAlignmentJustifyFill,
  IconAlignmentLeft,
  IconAlignmentLeftFill,
  IconAlignmentRight,
  IconAlignmentRightFill,
  IconBold,
  IconBoldFill,
  IconChevronDown,
  IconGallery,
  IconGrid4,
  IconItalic,
  IconItalicFill,
  IconLink,
  IconRedo,
  IconStrikeThrough,
  IconStrikeThroughFill,
  IconUnderline,
  IconUnderlineFill,
  IconUndo
} from 'justd-icons'
import { Button, Checkbox, Menu, Toolbar } from 'ui'

export default function ToolbarDemo() {
  return (
    <Toolbar aria-label="Toolbars">
      <Toolbar.Group aria-label="Text Formatting Options">
        <Toolbar.Item defaultSelected aria-label="Bold" size="square-petite" appearance="outline">
          {({ isSelected }) => <>{isSelected ? <IconBoldFill /> : <IconBold />}</>}
        </Toolbar.Item>
        <Toolbar.Item aria-label="Italic" size="square-petite" appearance="outline">
          {({ isSelected }) => <>{isSelected ? <IconItalicFill /> : <IconItalic />}</>}
        </Toolbar.Item>
        <Toolbar.Item aria-label="Underline" size="square-petite" appearance="outline">
          {({ isSelected }) => <>{isSelected ? <IconUnderlineFill /> : <IconUnderline />}</>}
        </Toolbar.Item>
        <Toolbar.Item aria-label="Strikethrough" size="square-petite" appearance="outline">
          {({ isSelected }) => (
            <>{isSelected ? <IconStrikeThroughFill /> : <IconStrikeThrough />}</>
          )}
        </Toolbar.Item>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group aria-label="Alignment">
        <Toolbar.Item aria-label="Align Left" size="square-petite" appearance="outline">
          {({ isSelected }) => (
            <>{isSelected ? <IconAlignmentLeftFill /> : <IconAlignmentLeft />}</>
          )}
        </Toolbar.Item>
        <Toolbar.Item aria-label="Align Center" appearance="outline">
          {({ isSelected }) => (
            <>{isSelected ? <IconAlignmentCenterFill /> : <IconAlignmentCenter />}</>
          )}
        </Toolbar.Item>
        <Toolbar.Item aria-label="Align Right" appearance="outline">
          {({ isSelected }) => (
            <>{isSelected ? <IconAlignmentRightFill /> : <IconAlignmentRight />}</>
          )}
        </Toolbar.Item>
        <Toolbar.Item aria-label="Align Justify" appearance="outline">
          {({ isSelected }) => (
            <>{isSelected ? <IconAlignmentJustifyFill /> : <IconAlignmentJustify />}</>
          )}
        </Toolbar.Item>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Checkbox>Spell Check</Checkbox>
      <Toolbar.Group className="ml-auto">
        <Menu>
          <Button aria-label="Other options" appearance="outline" size="small">
            Options...
            <IconChevronDown />
          </Button>
          <Menu.Content showArrow placement="bottom right">
            <Menu.Item>
              <IconUndo />
              Undo
            </Menu.Item>
            <Menu.Item>
              <IconRedo />
              Redo
            </Menu.Item>
            <Menu.Item>
              <IconLink />
              Insert Link
            </Menu.Item>
            <Menu.Item>
              <IconGallery />
              Insert Image
            </Menu.Item>
            <Menu.Item>
              <IconGrid4 />
              Insert Grid
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </Toolbar.Group>
    </Toolbar>
  )
}
