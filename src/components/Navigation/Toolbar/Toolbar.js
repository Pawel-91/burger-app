import React from 'react';
import classes from './Toolbar.module.css';
import Menu from '../SideDrawer/MenuButton/MenuButton';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Menu clicked={props.showSideDrawer}/>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems Authenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;