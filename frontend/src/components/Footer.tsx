import React from 'react'
import footerbg from '../assets/footerbg.svg';

export interface FooterProps {
    children?: React.ReactNode;
}

function Footer(props: FooterProps) {
    const { children = null } = props;

    return (
        <div className="bottom-0 flex justify-center w-full ">
            <img src={footerbg} width="100%" />
            {children}
        </div>
    )
}

export default Footer