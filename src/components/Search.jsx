import React from 'react';

const Search = ({handleSubmit, handleChange, userInput}) => (
    <form onSubmit={handleSubmit}>
        <label htmlFor="cityname">Enter city</label>
        <input id="cityname" name="cityname" type="text"  onChange={handleChange} value={userInput}/>
        <button>Submit</button>
      </form>
)

export default Search;