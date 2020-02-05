import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import './App.css';
import Temperature from './components/Temperature.jsx';
import Time from './components/Time.jsx';
import Weather from './components/Weather.jsx';
import Search from './components/Search.jsx';
import Background from './components/Background.jsx';
import Error from './components/Error.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: 'Houston',
      weather: {},
      description: {},
      timezone: 0,
      userInput: '',
      units: 'metric',
      backgroundUrl: 'https://source.unsplash.com/random',
      hasError: false
    }
  }

 componentDidMount() {
   this.callWeatherApi(this.state.location, this.state.units);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.state.location || prevState.units !== this.state.units) {
      this.callUnsplash(this.state.description.main);
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
        timezone: json.timezone }))
    .catch((e) => {
      this.setState(
        {
          hasError: true
        }
      )

    });
  }
  
  callUnsplash(query) {
    const unsplash = new Unsplash({
      accessKey: '3ab23bcb1ed8a2dcbe86f09fa4127e1b976918726521ca7e5ffc4c45e47f940a',
      secret: '4c54d7372592e3ce053d033a9a5f5e18cee49f86635beaddcdc889c52b8bce6f',
      callbackUrl: 'http://unsplash-js.herokuapp.com'
    });
    unsplash.photos.getRandomPhoto({ query: query })
    .then(toJson)
    .then(json => {
        this.setState({backgroundUrl: json.urls.regular});
    })
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.userInput !== '') {
      this.setState({location: this.state.userInput});
    }
  }

  render() {
    const {location, weather, description, timezone, userInput, backgroundUrl, hasError} = this.state;
    return (
      <div className="App">
      <Background description={description} backgroundUrl={backgroundUrl}/>
      <h2>Weather Now</h2>
      <h3>{location}</h3>
      <Time offset={timezone}/>
      <Temperature data={weather.temp}/>
      <Weather description={description}/>
      <Search handleSubmit={this.handleSubmit} userInput={userInput} handleChange={this.handleChange}/>
      { hasError && <Error /> }
      </div>
    );
  }
}

export default App;
