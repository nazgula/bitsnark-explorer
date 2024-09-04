import { Container } from '@mui/material';
import React from 'react'
import Header, { HeaderProps } from './Header';
import Navbar from './Navbar';
import Footer from './Footer';


interface PageProps {
    headerProps: HeaderProps
    className?: string;
    children: React.ReactNode;
}
function Page(props: PageProps) {
    const { headerProps, children, className = '' } = props;
    return (
        <div className="w-full h-screen">

            <Header {...headerProps}></Header>

            <div className=" flex flex-col items-center p-6 my-4 mx-auto w-[80vw] bg-white min-h-[85vh] rounded-l shadow overflow-hidden">
                <div className={` flex flex-col items-center w-full ${className} overflow-hidden`}>
                    {children}
                </div>

            </div>
            <Footer />
        </div >
    )
}

export default Page
