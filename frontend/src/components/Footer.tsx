import React from 'react'
import footerbg from '../assets/footerbg.svg';

export interface NavbarProps {
    children?: React.ReactNode;
}

function Footer(props: NavbarProps) {
    const { children = null } = props;

    return (
        <div className="bottom-0 flex justify-center w-full pt-16">
            <img src={footerbg} width="100%" />
            {children}
        </div>
    )
}

export default Footer