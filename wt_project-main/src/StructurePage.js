

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './StructurePage.css';

// const StructurePage = () => {
//   const { batch } = useParams();
//   const [htmlTable, setHtmlTable] = useState('');

//   useEffect(() => {
//     axios.get(`http://localhost:3001/batch/${batch}/details`)
//       .then(response => {
//         console.log('Response from server:', response.data);
//         setHtmlTable(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching BatchDetails:', error);
//         setHtmlTable('<p>No data available</p>');
//       });
//   }, [batch]);

//   return (
//     <div className='wrr' style={{ width: 'auto' }}>
//       <h2>Structure Page</h2>
//       <div  dangerouslySetInnerHTML={{ __html: htmlTable }} />
//     </div>
//   );
// };

// export default StructurePage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './StructurePage.css';


const StructurePage = ({ userRole }) => {
  const { batch } = useParams();
  const [htmlTable, setHtmlTable] = useState('');
  const navigate = useNavigate();
  const [isEditing] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:3001/batch/${batch}/details`)
      .then(response => {
        console.log('Response from server:', response.data);
        setHtmlTable(response.data);
      })
      .catch(error => {
        console.error('Error fetching BatchDetails:', error);
        setHtmlTable('<p>No data available</p>');
      });
  }, [batch]);


  const handleEditClick = () => {
    // Handle the click based on user role
    

    // if (userRole === 'admin@kletech.ac.in') 
    // {
      // console.log('Navigating to /EditPage');
      // Allow admin to edit syllabus
      // You can add logic here to navigate to the edit page or show a modal
      navigate('/batch/:batch/:option/edit');
    // } else {
    //   // Display an alert for other roles
      // alert('You do not have permission to edit the syllabus.');
    // }
  };

  const handlePrintClick = () => {
    // Trigger the print functionality
    window.print();
  };


  return (
    <div className='wrr' style={{ width: 'auto' }}>
      <h2>Structure Page</h2>
      <div id="print-content" dangerouslySetInnerHTML={{ __html: htmlTable }} />

      {!isEditing && (
        <>
          <button
            className="editButton"
            onClick={handleEditClick}
            disabled={userRole === 'hod'}
            style={{
              cursor: userRole === 'hod' ? 'not-allowed' : 'pointer',
              backgroundColor: userRole === 'hod' ? '#ccc' : '#007bff',
              color: userRole === 'hod' ? '#555' : '#fff',
              height: '40px',
              width: '100px',
            }}
          >
            Edit
          </button>
            <button
            className="printButton"
            onClick={handlePrintClick}
            style={{
              cursor: 'pointer',
              backgroundColor: '#4caf50',
              color: '#fff',
              height: '40px',
              marginLeft: '10px',
            }}
          >
            Print
          </button>
          </>
        )}
      
    </div>
    
  );
};

export default StructurePage;
