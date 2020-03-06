import React from 'react';
import PropTypes from 'prop-types';

import MenuIcon from '../../../../assets/images/menu-icon.svg';
import classes from './MenuButton.module.css';

const menuButton = (props) => (
    <div className={classes.MenuButton}>
    <   img src={MenuIcon} onClick={props.clicked} alt="menu"/>
    </div>
);

menuButton.propTypes = {
    clicked: PropTypes.func.isRequired
};

export default menuButton;