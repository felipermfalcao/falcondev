import React, { useState, useEffect } from "react";
import { Navbar, Switch, Avatar } from "@nextui-org/react";
import {useTheme} from 'next-themes'

import Logo from "./Logo";
import { MoonIcon } from "./Icons/moon";
import { SunIcon } from "./Icons/sun";

export default function Header(props){
    const {theme, setTheme} = useTheme('');

    return (
        <Navbar variant={'static'}>
                <div style={{flex: 1, flexDirection:'row', display: 'flex', justifyContent: 'space-between', paddingTop: 10,
                             paddingLeft: 5}}>
                    <div style={{width:'70%'}}>
                        <Logo tema={theme} />
                    </div>

                    <div style={{alignSelf:'center', paddingRight: 5}}>
                    <Switch
                        checked={true}
                        size="md"
                        color="primary"
                        shadow
                        iconOn={<MoonIcon filled />}
                        iconOff={<SunIcon filled />}
                        onChange={() => {setTheme(theme === 'dark' ? 'light' : 'dark')}}
                        />
                    </div>
                </div>
        </Navbar>
    );
}