import React from 'react';
import './Weather.css';

const Weather = props => (
    <div className="weather">
        <h2>{props.description.main}</h2>
        <h3>{props.description.description}</h3>
    </div>
)

export default Weather;