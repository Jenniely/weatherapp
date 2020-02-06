import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({handleToggle, isToggleOn}) => (
    <button className='btn' onClick={handleToggle}>
        {isToggleOn ? 'C' : 'F'}
    </button>
)

export default ToggleButton;