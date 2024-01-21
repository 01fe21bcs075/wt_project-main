import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './socse.css';

const Socse = () => {
  const batchOptions = ['2020-2024', '2021-2025', '2022-2026', '2023-2027'];
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleBatchSelection = (batch) => {
    setSelectedBatch(batch);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    if (option === 'structure') {
      // Check if a batch is selected before navigating
      if (selectedBatch) {
        navigate(`/batch/${encodeURIComponent(selectedBatch)}/${option}`);
      } else {
        console.error('Please select a batch before navigating to Structure.');
      }
    }
  };

  return (
    <div className="socse-container">
      <div className='heading'>
        <h1>Welcome to Board of Studies</h1>
      </div>
      <div className="sidebar">
        <h2>Select Batch</h2>
        <ul>
          {batchOptions.map((batch) => (
            <li key={batch} onClick={() => handleBatchSelection(batch)}>
              {batch}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        {selectedBatch && (
          <>
            <h3>Selected Batch: {selectedBatch}</h3>
            <div>
              <h4>Options</h4>
              <ul>
                <li onClick={() => handleOptionClick('structure')}>Structure</li>
                <li onClick={() => handleOptionClick('semester')}>Semester</li>
                <li onClick={() => handleOptionClick('syllabus')}>Syllabus</li>
              </ul>
            </div>
            {selectedOption && (
              <div>
                <h4>Selected Option: {selectedOption}</h4>
                <Link to={`/batch/${selectedBatch}/${selectedOption}`}>Go to {selectedOption}</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Socse;
