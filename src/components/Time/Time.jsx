import React from 'react';
import moment from 'moment';
import './Time.css';

const Time = props => (

    <div className="time">
        <h3>{moment.utc().add(props.offset, 's').format("ddd, h:mm A")}</h3>
    </div>
)


export default Time;