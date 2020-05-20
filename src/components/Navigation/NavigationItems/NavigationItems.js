import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
       <NavigationItem link='/' exact>Burger builder</NavigationItem>
       {props.Authenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
       { props.Authenticated ? 
            <NavigationItem link='/logout'>Logout</NavigationItem>
            : <NavigationItem link='/auth'>Authenticate</NavigationItem>}
    </ul>
);

export default navigationItems;