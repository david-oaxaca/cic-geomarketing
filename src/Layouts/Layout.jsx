import React from 'react';
import Header from '../Components/Header';


const Layout = ({ children }) => {
    return(
        <div className="Layout">
            <Header />
            {children}
        </div>
    );
}

export default Layout;