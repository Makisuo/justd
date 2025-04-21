"use client"

import {buttonStyles} from "@/components/ui/button"
import {Drawer, type DrawerContentProps} from "@/components/ui/drawer"
import {TextField} from "@/components/ui/text-field"
import {Select} from "@/components/ui/select";
import React from "react";
import type {Key} from "react-aria-components";
import {Switch} from "@/components/ui/switch";

export default function DrawerBasicDemo() {
    const [side, setSide] = React.useState<Key>('bottom')
    const [float, setFloat] = React.useState<boolean>(false)
    return (
        <div className='space-y-6'>
            <div className="absolute top-3 left-3 flex items-center gap-2">
                <Select className='w-32' aria-label="Side" placeholder="Select a side" selectedKey={side} onSelectionChange={setSide}>
                    <Select.Trigger/>
                    <Select.List>
                        <Select.Option id={'top'} textValue={'Top'}>
                            Top
                        </Select.Option>
                        <Select.Option id={'left'} textValue={'Left'}>
                            Left
                        </Select.Option>
                        <Select.Option id={'bottom'} textValue={'Bottom'}>
                            Bottom
                        </Select.Option>
                        <Select.Option id={'right'} textValue={'Right'}>
                            Right
                        </Select.Option>
                    </Select.List>
                </Select>
                <Switch isSelected={float} onChange={setFloat}>Floating</Switch>
            </div>
            <Drawer>
                <Drawer.Trigger className={buttonStyles({intent: "outline"})}>Login</Drawer.Trigger>
                <Drawer.Content side={side as DrawerContentProps['side']} isFloating={float}>
                    <Drawer.Header>
                        <Drawer.Title>Login</Drawer.Title>
                        <Drawer.Description>
                            Please enter your credentials to access your account.
                        </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body className="space-y-4">
                        <TextField label="Email" type="email" placeholder="john.doe@example.com"/>
                        <TextField label="Password" type="password" placeholder="••••••••••••" isRevealable/>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <Drawer.Close className="w-full">Login</Drawer.Close>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer>
        </div>
    )
}
