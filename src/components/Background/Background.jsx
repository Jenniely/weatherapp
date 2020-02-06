import React from 'react';
import './Background.css';

const Background = props => (
        <div className="background">
        <img alt={props.description} src={props.backgroundUrl}></img>
    </div>    
    );

export default Background;