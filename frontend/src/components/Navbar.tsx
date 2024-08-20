import React from 'react'
import logo from '../assets/logo.svg';

export interface NavbarProps {
    children?: React.ReactNode;
}

function Navbar(props: NavbarProps) {
    const { children = null } = props;

    return (
        <div className="sticky top-0 flex justify-center w-full p-4 bg-white shadow-sm">
            <img src={logo} className="App-logo" alt="logo" width="32" />
            {children}
        </div>
    )
}

export default Navbar