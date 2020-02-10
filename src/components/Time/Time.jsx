import React, {Component} from 'react';
import moment from 'moment';
import './Time.css';

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment.utc().add(this.props.offset, 's').format("ddd, h:mm:ss A")
        };
    }
    
    componentDidMount() {
            this.intervalID = setInterval(
                () => this.tick(), 1000
            );
        }

        componentWillUnmount() {
            clearInterval(this.intervalID);
        }

        tick(props) {
            this.setState({time: moment.utc().add(this.props.offset, 's').format("ddd, h:mm:ss A")});
        }
        render() {
            return (
                <div className="time">
                <h3>{this.state.time}</h3>
            </div>);
        }
}

export default Time;