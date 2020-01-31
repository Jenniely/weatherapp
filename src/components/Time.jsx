import React from 'react';
import moment from 'moment';

const Time = props => (

    <div className="time">
        <h2>{moment.utc().add(props.offset, 's').format("ddd, h:mm A")}</h2>
    </div>
)


export default Time;