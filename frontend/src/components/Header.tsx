import { Container, Typography } from '@mui/material';
import React from 'react'

export interface HeaderProps {
    title: string;
    subTitle?: string;
    backLink?: string;
    children?: React.ReactNode;
}

function Header(props: HeaderProps) {
    const { title, subTitle = '', backLink, children = null } = props;

    return (
        <Container fixed className="bg-red">
            <Typography variant="h3" component="h1" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
                {subTitle}
            </Typography>
            {children}
        </Container>
    )
}

export default Header