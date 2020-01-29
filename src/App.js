import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: 'Moscow',
      weather: {}
    }
  }

  componentDidMount() {
    let location = this.state.location;
    console.log(location);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=fd9f9132bce794b17d12ce306e8ba0db`)
    .then(response => response.json())
    .then(json =>
      this.setState({ weather: json })); 
  }

  render() {
    const {location, weather} = this.state;
    return (
      console.log(weather.main),
      <div className="App">
      <h2>Weather Now</h2>
      <h3>{location}</h3>
      <h2>{weather.main}</h2>
      </div>
    );
  }
}

export default App;
