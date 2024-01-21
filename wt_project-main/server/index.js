const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const CommityModel = require ('./models/Commity');
const BatchDetailsModel = require('./models/BatchDetails');
const docx = require('html-docx-js');
const pdf = require('html-pdf');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());




const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://boardofstudies:webtech%402023@boardofstudies.dqcxb4r.mongodb.net/BoS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
   CommityModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.get('/batch/:batch/details', async (req, res) => {
  const { batch } = req.params;
  const cssStyles = `
  <style>
    .semester-header {
      margin-right: 20px; /* Adjust the margin as needed */
    }
  </style>
`;

  try {
    const batchDetails = await BatchDetailsModel.find({ batch });

    if (Array.isArray(batchDetails) && batchDetails.length > 0) {
      const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

      const tables = [];
      for (let i = 0; i < 4; i++) {
        const startSemester = i * 2 + 1;
        const endSemester = startSemester + 1;

        const tableRows = semesters.slice(startSemester - 1, endSemester).map((semester) => {
          const semesterCourses = batchDetails
            .filter((item) => item.semester === semester)
            .map((item) => {
              return item.courses.map((course) => `
                <tr>
                  <td>${course.course_name}</td>
                  <td>${course.course_code}</td>
                  <td>${course.credit_hours.lectures || '0'}-${course.credit_hours.tutorials || '0'}-${course.credit_hours.labs || '0'}</td>
                </tr>
              `).join('');
            }).join('');

          return `
            <td>
              <table class="inner-table">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Course Code</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  ${semesterCourses}
                </tbody>
              </table>
            </td>`;
        });

        tables.push(`
          <table class="table table-bordered border-primary">
            <thead style="background-color: #f2f2f2;">
              <tr>
                <th colspan="3">Semester ${startSemester}Semester ${endSemester}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                ${tableRows.join('')}
              </tr>
            </tbody>
          </table>
        `);
      }

      const htmlTable = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            table {
              border-collapse: collapse;
              width: 70%;
              margin-top: 20px;
              border: 1px solid #ddd;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              font-size: 16px;
              font-family: 'Times New Roman', Times, serif;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .scrollable-table {
              max-height: 600px;
              overflow-y: auto;
              border: 1px solid #ddd;
            }
            .inner-table {
              width: 100%;
              margin-top: 15px;
              border-collapse: collapse;
              border: 1px solid #ddd;
            }
            .inner-table th, .inner-table td {
              border: 1px solid #ddd;
              padding: 12px;
            }
          </style>
        </head>
        <body>
          <div class="scrollable-table">
            ${tables.join('')}
          </div>
        </body>
        </html>`;

      res.send(htmlTable);
    } else {
      res.send('No data available for the specified batch');
    }
  } catch (error) {
    console.error('Error fetching BatchDetails:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ... (rest of your code remains unchanged)

// app.get('/batch/:batch/details', async (req, res) => {
//   const { batch } = req.params;

//   try {
//     const batchDetails = await BatchDetailsModel.find({ batch });

//     if (Array.isArray(batchDetails) && batchDetails.length > 0) {
//       const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

//       const tableRows = semesters.map((semester) => {
//         const semesterCourses = batchDetails
      
//         // .flatMap((item) => item.courses) // Flatten the courses array
//           .filter((item) => item.semester === semester)
//           .map((item) => {
//             return item.courses.map((course) => `
//             <p>${course.course_name}</p>
//               <p>${course.course_code}</p>
//               <p>(${course.credit_hours.lectures || '0'}-${course.credit_hours.tutorials || '0'}-${course.credit_hours.labs || '0'})</p>
//             `).join('');
//           });

//         return `
//           <td>
//             ${semesterCourses.join('')}
//           </td>
//         `;

    
//     return `
//       <td>
//         ${semesterCourses}
//       </td>
//     `;
//        });

     

//       const htmlTable = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <style>
//     table {
//       border-collapse: collapse;
//       width: 100%;
//       margin-top: 20px;
//       border: 1px solid #ddd; /* Add border to the table */
//     }
//     th{
//       border: 1px solid #dddddd;
//       text-align: left;
//       padding: 8px;
//       font-size: 14px;
//       font-family: 'Times New Roman', Times, serif;
//     }
//     th {
//       background-color: #f2f2f2;
//     }
//     .scrollable-table {
//       max-height: 500px;
//       overflow-y: auto;
//       border: 1px solid #ddd; /* Add border to the scrollable container */
//     }
//   </style>
// </head>
// <body>
//   <div class="scrollable-table">
//     <table class="table table-bordered border-primary">
//       <thead style="background-color: #f2f2f2;">
//         <tr>
//         <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Semester</th>
//           ${semesters.map((semester) => <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">${semester}</th>).join('')}
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td style="border: 1px solid #ddd; padding: 8px;"></td>
//           ${tableRows.join('')}
//         </tr>
//       </tbody>
//     </table>
//   </div>
// </body>
// </html>
// `;

// // Now you can use the 'htmlTable' string as needed in your application.

//       res.send(htmlTable);
//     } else {
//       res.send('No data available for the specified batch');
//     }
//   } catch (error) {
//     console.error('Error fetching BatchDetails:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// app.get('/batch/:batch/details', async (req, res) => {
//   const { batch } = req.params;

//   try {
//     const batchDetails = await BatchDetailsModel.find({ batch });

//     if (Array.isArray(batchDetails) && batchDetails.length > 0) {
//       const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

//       // Split semesters into two sections
//       const semestersSection1 = semesters.slice(0, 4);
//       const semestersSection2 = semesters.slice(4);

//       const tableRowsSection1 = semestersSection1.map((semester) => {
//         const semesterCourses = batchDetails
//           .filter((item) => item.semester === semester)
//           .map((item) => {
//             return item.courses.map((course) => `
//               <tr>
//                 <td>${course.course_name}</td>
//                 <td>${course.course_code}</td>
//                 <td>${course.credit_hours.lectures || '0'}-${course.credit_hours.tutorials || '0'}-${course.credit_hours.labs || '0'}</td>
//               </tr>
//             `).join('');
//           }).join('');

//         return `
//           <td>
//             <table class="inner-table">
//               <thead>
//                 <tr>
//                   <th>Course Name</th>
//                   <th>Course Code</th>
//                   <th>Credits</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${semesterCourses}
//               </tbody>
//             </table>
//           </td>`;
//       });

//       const tableRowsSection2 = semestersSection2.map((semester) => {
//         const semesterCourses = batchDetails
//           .filter((item) => item.semester === semester)
//           .map((item) => {
//             return item.courses.map((course) => `
//               <tr>
//                 <td>${course.course_name}</td>
//                 <td>${course.course_code}</td>
//                 <td>${course.credit_hours.lectures || '0'}-${course.credit_hours.tutorials || '0'}-${course.credit_hours.labs || '0'}</td>
//               </tr>
//             `).join('');
//           }).join('');

//         return `
//           <td>
//             <table class="inner-table">
//               <thead>
//                 <tr>
//                   <th>Course Name</th>
//                   <th>Course Code</th>
//                   <th>Credits</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${semesterCourses}
//               </tbody>
//             </table>
//           </td>`;
//       });

//       const htmlTable = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <style>
//             table {
//               border-collapse: collapse;
//               width: 100%;
//               margin-top: 20px;
//               border: 1px solid #ddd;
//             }
//             th, td {
//               border: 1px solid #ddd;
//               padding: 12px;
//               font-size: 16px;
//               font-family: 'Times New Roman', Times, serif;
//               text-align: left;
//             }
//             th {
//               background-color: #f2f2f2;
//             }
//             .scrollable-table {
//               max-height: 600px;
//               overflow-y: auto;
//               border: 1px solid #ddd;
//             }
//             .inner-table {
//               width: 100%;
//               margin-top: 15px;
//               border-collapse: collapse;
//               border: 1px solid #ddd;
//             }
//             .inner-table th, .inner-table td {
//               border: 1px solid #ddd;
//               padding: 12px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="scrollable-table">
//             <table class="table table-bordered border-primary">
//               <thead style="background-color: #f2f2f2;">
//                 <tr>
//                   ${semestersSection1.map((semester) => <th>Semester ${semester}</th>).join('')}
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   ${tableRowsSection1.join('')}
//                 </tr>
//                 <thead style="background-color: #f2f2f2;">
//                 <tr>
//                   ${semestersSection2.map((semester) => <th>Semester ${semester}</th>).join('')}
//                 </tr>
//               </thead>
//                 <tr>
//                   ${tableRowsSection2.join('')}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </body>
//         </html>`;

//       res.send(htmlTable);
//     } else {
//       res.send('No data available for the specified batch');
//     }
//   } catch (error) {
//     console.error('Error fetching BatchDetails:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // ... (rest of your code remains unchanged)

app.post('/edit', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await CommityModel.findOne({ email });

    if (existingUser) {
      // Update the password for the existing user
      existingUser.password = password;
      const updatedUser = await existingUser.save();
      res.json(updatedUser);
    } else {
      // If the user doesn't exist, create a new user
      const newUser = await CommityModel.create(req.body);
      res.json(newUser);
    }
  } catch (error) {
    console.error('Error in edit:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});


//<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Semester</th>