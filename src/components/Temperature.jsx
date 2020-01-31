import React from 'react';

const Temperature = props => (
    <div className="temperature">
        <h2>{Math.round(props.data)}&deg;</h2>
    </div>
)

export default Temperature;