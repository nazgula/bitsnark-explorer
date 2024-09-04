import React from 'react'
import Header, { HeaderProps } from './Header';
import Footer from './Footer';


interface PageProps {
    headerProps: HeaderProps
    className?: string;
    children: React.ReactNode;
}
function Page(props: PageProps) {
    const { headerProps, children, className = '' } = props;
    return (
        <div className="w-full h-screen overflow-hidden ">
            <Header {...headerProps}></Header>

            <div className={`flex flex-col items-center p-6 my-4 mx-auto w-[80vw] bg-white min-h-[60vh] rounded-l shadow `}>
                <div className={` flex flex-col items-center w-full max-h-[60vh] overscroll-y-auto overflow-scroll ${className}`}>
                    {children}
                </div>
            </div>

            <Footer />

        </div >
    )
}

export default Page
