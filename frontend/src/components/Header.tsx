import { Container, Typography } from '@mui/material';
import React from 'react'
import Icon from './Icon';
import Navbar from './Navbar';

export interface HeaderProps {
    title: string;
    subTitle?: string;
    backLink?: string;
    children?: React.ReactNode;
}

function Header(props: HeaderProps) {
    const { title, subTitle = '', backLink, children = null } = props;

    return (
        <div className="sticky top-0 z-50 flex flex-col justify-center w-full bg-white shadow-sm border-b-[1px] min-h-24 border-primary">
            <Navbar />
            <h1 className="w-full pt-8 text-2xl">
                {title}
            </h1>
            <div className="w-full pb-8">
                {subTitle}
            </div>
            {children}
        </div>
    )
}

export default Header