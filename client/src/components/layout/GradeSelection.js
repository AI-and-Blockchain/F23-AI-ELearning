import {React, useEffect, useState} from 'react';
import axios from 'axios';


const GradeSelection = () => {

  useEffect(() => {
    
  }, [])

  const [selectedButton, setSelectedButton] = useState(null);
  const [data, setData] = useState("");

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    axios.get('http://localhost:3001/test', {
      params: {
        grade: buttonIndex,
      },
    })
    .then(response => {
      // Handle the successful response
      setData(response.body);
      console.log(response.body);
    })
    .catch(error => {
      // Handle errors
      console.error('Error fetching data:', error);
    });
    // Add your logic for handling button click
  };

  return (
    <div className="circular-buttons-container">
      <button className={`circular-button ${selectedButton === 0 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(0)}>Kindergarten</button>
      <button className={`circular-button ${selectedButton === 1 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(1)}>1st Grade</button>
      <button className={`circular-button ${selectedButton === 2 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(2)}>2nd Grade</button>
      <button className={`circular-button ${selectedButton === 3 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(3)}>3rd Grade</button>
      <button className={`circular-button ${selectedButton === 4 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(4)}>4th Grade</button>
      <button className={`circular-button ${selectedButton === 5 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(5)}>5th Grade</button>
      <button className={`circular-button ${selectedButton === 6 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(6)}>6th Grade</button>
      <button className={`circular-button ${selectedButton === 7 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(7)}>7th Grade</button>
      <button className={`circular-button ${selectedButton === 8 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(8)}>8th Grade</button>
      <button className={`circular-button ${selectedButton === 9 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(9)}>Freshmen</button>
      <button className={`circular-button ${selectedButton === 10 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(10)}>Sophmore</button>
      <button className={`circular-button ${selectedButton === 11 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(11)}>Junior</button>
      <button className={`circular-button ${selectedButton === 12 ? 'selected' : ''}`}
        onClick={() => handleButtonClick(12)}>Senior</button>
      <h1 className="static">What Grade Are You?</h1>
      {data && (
        <pre>{data}</pre>
      )}
    </div>
  );
}

export default GradeSelection;