"use client"

import { Avatar, ComboBox } from "ui"

export default function ComboBoxDisabledDemo() {
  return (
    <ComboBox placeholder="Select a user" label="Users" isDisabled>
      <ComboBox.Input />
      <ComboBox.List items={users}>
        {(item) => (
          <ComboBox.Option key={item.id} id={item.id} textValue={item.name}>
            <Avatar src={item.image_url} />
            {item.name}
          </ComboBox.Option>
        )}
      </ComboBox.List>
    </ComboBox>
  )
}

const users = [
  { id: 1, name: "Barbara Kirlin Sr.", image_url: "https://i.pravatar.cc/150?img=1" }
  //...
]
