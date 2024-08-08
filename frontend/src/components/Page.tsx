import { Container } from '@mui/material';
import React from 'react'
import Header, { HeaderProps } from './Header';


interface PageProps {
    headerProps: HeaderProps
    children: React.ReactNode;
}
function Page(props: PageProps) {
    const { headerProps, children } = props;
    return (
        <Container fixed>
            <Header {...headerProps}></Header>
            {children}
        </Container>
    )
}

export default Page
