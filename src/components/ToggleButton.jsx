import React from 'react';

const ToggleButton = ({handleToggle, isToggleOn}) => (
    <button onClick={handleToggle}>
        {isToggleOn ? 'C' : 'F'}
    </button>
)

export default ToggleButton;