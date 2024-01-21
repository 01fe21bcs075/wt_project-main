import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPage = () => {
  const { batch, option } = useParams()
  const navigate = useNavigate();

  // State for form fields
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [lectures, setLectures] = useState(0);
  const [tutorials, setTutorials] = useState(0);
  const [labs, setLabs] = useState(0);

  // Fetch initial data for editing
  useEffect(() => {
    // Fetch the existing data for the specified batch and option
    axios.get(`http://localhost:3001/batch/${batch}/details/${option}`)
      .then(response => {
        // Set the form fields with the existing data
        setCourseName(response.data.courseName || '');
        setCourseCode(response.data.courseCode || '');
        setLectures(response.data.credit_hours.lectures || 0);
        setTutorials(response.data.credit_hours.tutorials || 0);
        setLabs(response.data.credit_hours.labs || 0);
      })
      .catch(error => {
        console.error('Error fetching data for editing:', error);
        // Handle errors or redirect to an error page
      });
  }, [batch, option]);

  // Function to handle the form submission
  const handleSubmit = async () => {
    try {
      // Prepare the data to be updated
      const updatedData = {
        courseName,
        courseCode,
        credit_hours: {
          lectures,
          tutorials,
          labs,
        },
      };

 // Send a PUT request to update the data
 await axios.put(`http://localhost:3001/batch/${batch}/update/${option}`, { updatedData });

 // Redirect to the StructurePage after successful update
 navigate(`/batch/${batch}/${option}`);
} catch (error) {
 console.error('Error updating data:', error);
 // Handle errors or show an error message
}
};

  return (
    <div>
      <h2>Edit Page</h2>
      <form>
        {/* Your form fields go here */}
        <div>
          <label htmlFor="courseName">Course Name:</label>
          <input type="text" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="courseCode">Course Code:</label>
          <input type="text" id="courseCode" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lectures">Lectures:</label>
          <input type="number" id="lectures" value={lectures} onChange={(e) => setLectures(e.target.value)} />
        </div>
        <div>
          <label htmlFor="tutorials">Tutorials:</label>
          <input type="number" id="tutorials" value={tutorials} onChange={(e) => setTutorials(e.target.value)} />
        </div>
        <div>
          <label htmlFor="labs">Labs:</label>
          <input type="number" id="labs" value={labs} onChange={(e) => setLabs(e.target.value)} />
        </div>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default EditPage;
