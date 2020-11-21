import React from 'react';
import Link from 'next/link';
import Header from '../layouts/Header';

const Layout = props => {
    return (  
        <>
            <Header />
            <main>
                {props.children}
            </main>
        </>
    );
}
 
export default Layout;