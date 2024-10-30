import React, { useState } from 'react'
import { Switch } from 'antd';
import { useGlobalContext } from './context';

const Header = () => {
    const { darkTheme, setDarkTheme } = useGlobalContext()
    const onChange = (checked: boolean) => {
        checked ? setDarkTheme(checked) : setDarkTheme(false)
    };
    return (
        <div>
            <header className='flex gap-1 md:gap-5 items-center justify-end'>
                {darkTheme ?
                    <img src="assets/images/icon-sun-light.svg" alt="sun" />
                    :
                    <img src="assets/images/icon-sun-dark.svg" alt="sun" />
                }
                <div className=''>
                    <Switch defaultChecked={false} onChange={onChange} />
                </div>
                {
                    darkTheme ?
                        <img src="assets/images/icon-moon-light.svg" alt="moon" />
                        :
                        <img src="assets/images/icon-moon-dark.svg" alt="moon" />
                }
            </header>
        </div>
    )
}

export default Header