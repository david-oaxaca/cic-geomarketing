import React from 'react';
import Header from '../Components/Header';
import { makeStyles } from '@material-ui/core';


const usesStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    page: {
        background: '#f9f9f9',
        width: '100%'
    }
})

const Layout = ({ children }) => {
    const classes = usesStyles()

    return(
        <div className={classes.root}>
            <Header />
            <div className={classes.page}>
                {children}
            </div>
        </div>
    );
}

export default Layout;