import { Container, Typography } from '@mui/material';
import React from 'react'
import Icon from './Icon';

export interface HeaderProps {
    title: string;
    subTitle?: string;
    backLink?: string;
    children?: React.ReactNode;
}

function Header(props: HeaderProps) {
    const { title, subTitle = '', backLink, children = null } = props;

    return (
        <div className="flex flex-col justify-center w-full h-24 bg-white shadow-sm  min-h-24 top-16">
            <h1 className="w-full text-2xl">
                {title}
            </h1>
            <div className="w-full">
                {subTitle}
            </div>
            {children}
        </div>
    )
}

export default Header