import React, { Component } from 'react';
import './App.css';
import Temperature from './components/Temperature.jsx';
import Time from './components/Time.jsx';
import Weather from './components/Weather.jsx';
import Search from './components/Search.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: 'Houston',
      weather: {},
      description: {},
      timezone: 0,
      userInput: '',
      units: 'metric'
    }
  }

 componentDidMount() {
   this.callWeatherApi(this.state.location, this.state.units);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.state.location || prevState.units !== this.state.units) {
      this.callWeatherApi(this.state.location, this.state.units);
    }
  }

  callWeatherApi(location, units) {
    const apiKey = 'fd9f9132bce794b17d12ce306e8ba0db';
    const query = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=${apiKey}`;
    fetch(query)
    .then(response => response.json())
    .then(json =>
      this.setState({ 
        weather: json.main, 
        description: json.weather[0], 
        timezone: json.timezone })); 
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({location: this.state.userInput});
  }

  render() {
    const {location, weather, description, timezone, userInput} = this.state;
    console.log(location+' on render');
    return (
      <div className="App">
      <h2>Weather Now</h2>
      <h3>{location}</h3>
      <Time offset={timezone}/>
      <Temperature data={weather.temp}/>
      <Weather description={description}/>
      <Search handleSubmit={this.handleSubmit} userInput={userInput} handleChange={this.handleChange} />
      </div>
    );
  }
}

export default App;
