import React from 'react';
import PropTypes from 'prop-types'
import classes from './Button.module.css';

const button = (props) => (
    <button className={[classes.Button, classes[props.btnType]].join(' ')}
        disabled = {props.disabled}
        onClick={props.clicked}>
            {props.children}
        </button>
);

button.propTypes = {
    btnType: PropTypes.oneOf(['Success', 'Danger']),
    onClick: PropTypes.func
};

export default button;
