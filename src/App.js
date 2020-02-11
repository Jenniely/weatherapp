import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import Temperature from './components/Temperature/Temperature.jsx';
import Time from './components/Time/Time.jsx';
import Weather from './components/Weather/Weather.jsx';
import Search from './components/Search/Search.jsx';
import Error from './components/Error/Error.jsx';
import ToggleButton from './components/ToggleButton/ToggleButton.jsx';
import './App.css';

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
      backgroundUrl: '',
      hasError: false,
      isToggleOn: true,
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
      this.setState(
         {
          weather: json.main, 
          description: json.weather[0], 
          timezone: json.timezone,
          hasError: false,
        }, () => this.callUnsplash(this.state.description.main)
        ))
    .catch((e) => {
      this.setState(
        {
          hasError: true
        }
      )

    });
  }
  
  callUnsplash(query) {
    const width = window.innerWidth;
    const unsplash = new Unsplash({
      accessKey: '3ab23bcb1ed8a2dcbe86f09fa4127e1b976918726521ca7e5ffc4c45e47f940a',
      secret: '4c54d7372592e3ce053d033a9a5f5e18cee49f86635beaddcdc889c52b8bce6f',
      callbackUrl: 'http://unsplash-js.herokuapp.com'
    });
    unsplash.photos.getRandomPhoto({ query: query, orientation: 'landscape' })
    .then(toJson)
    .then(json => {
        this.setState({backgroundUrl: json.urls.raw  + `&w=${width}&dpi=2`});
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

  handleToggle = () => {
		this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
     if (this.state.units === 'metric') {
     this.setState({units:'imperial'})
    };
    if (this.state.units === 'imperial') {
      this.setState({units: 'metric'})
     };
  }

  render() {
    const {location, weather, description, timezone, userInput, backgroundUrl, hasError, isToggleOn} = this.state;
    return (
      <div className="App" style={{backgroundImage: `url(${backgroundUrl})`}}>  
      <h2 className='cityName'>{location}</h2>
      <Time offset={timezone}/>
      <Temperature data={weather.temp}/>
      <Weather description={description}/>
      <Search handleSubmit={this.handleSubmit} userInput={userInput} handleChange={this.handleChange}/>
      { hasError && <Error /> }
      <ToggleButton isToggleOn={isToggleOn} handleToggle={this.handleToggle}/>
      </div>
    );
  }
}

export default App;
