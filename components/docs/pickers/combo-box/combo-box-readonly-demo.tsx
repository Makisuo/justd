"use client"

import { Avatar, ComboBox } from "ui"

const users = [
  { id: 1, name: "Barbara Kirlin Sr.", image_url: "https://i.pravatar.cc/150?img=1" }
  //...
]
export default function ComboBoxReadonlyDemo() {
  return (
    <ComboBox defaultSelectedKey={1} placeholder="Select a user" label="Users" isReadOnly>
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
