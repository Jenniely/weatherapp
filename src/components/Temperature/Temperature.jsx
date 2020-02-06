import React from 'react';
import './Temperature.css';

const Temperature = props => (
    <div className="temperature">
        <h2>{Math.round(props.data)}&deg;</h2>
    </div>
)

export default Temperature;