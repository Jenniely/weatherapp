import React from 'react';
import './Search.css';

const Search = ({handleSubmit, handleChange, userInput}) => (
    <form className='search' onSubmit={handleSubmit}>
        <label htmlFor="cityname"> Enter city</label>
        <input id="cityname" name="cityname" type="text"  onChange={handleChange} value={userInput}/>
        <button>Submit</button>
      </form>
)

export default Search;