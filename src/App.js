import React, { Component } from 'react';
import './App.css';
import Temperature from './components/Temperature.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: 'Moscow',
      weather: {},
      description: {}
    }
  }

 componentDidMount() {
    let location = this.state.location;
    console.log(location);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=fd9f9132bce794b17d12ce306e8ba0db`)
    .then(response => response.json())
    .then(json =>
      this.setState({ weather: json.main, description: json.weather[0] })); 
  }

  render() {
    const {location, weather, description} = this.state;
    return (
      console.log(weather),
      console.log(description),
      <div className="App">
      <h2>Weather Now</h2>
      <h3>{location}</h3>
      <Temperature data={weather.temp}/>
      </div>
    );
  }
}

export default App;
