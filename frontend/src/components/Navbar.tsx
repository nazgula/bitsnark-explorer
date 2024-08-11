import React from 'react'
import logo from '../assets/logo.svg';

export interface NavbarProps {
    children?: React.ReactNode;
}

function Navbar(props: NavbarProps) {
    const { children = null } = props;

    return (
        <div className="sticky top-0 flex justify-center w-full h-16 bg-white shadow-sm min-h-16">
            <img src={logo} className="App-logo" alt="logo" />
            {children}
        </div>
    )
}

export default Navbar