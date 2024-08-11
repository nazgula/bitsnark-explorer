import { Container } from '@mui/material';
import React from 'react'
import Header, { HeaderProps } from './Header';
import Navbar from './Navbar';


interface PageProps {
    headerProps: HeaderProps
    children: React.ReactNode;
}
function Page(props: PageProps) {
    const { headerProps, children } = props;
    return (

        <div className="w-full ">
            <Navbar />
            <Header {...headerProps}></Header>
            <div className=" flex flex-col items-center p-6 my-4 mx-auto w-[80vw] bg-white min-h-[85vh] rounded-l shadow overflow-y-scroll">


                <div className="flex flex-col items-center w-full ">

                    {children}
                </div>
            </div>
        </div>

    )
}

export default Page
