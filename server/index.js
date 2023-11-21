import express from "express";
import cors from 'cors';
import { createHelia } from 'helia';
import { json } from '@helia/json';
import { spawn } from 'child_process';
import CourseData from './knn_recommendations/course_data.json' assert { type: "json" };

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json())

const helia = await createHelia();
const j = json(helia);
const hash = await j.add(CourseData);

const retrieveFileFromIPFS = async (cid) => {
  try {
    const result = await ipfsClient.cat(cid);
    console.log("Raw Data: ", result.toString());
    const jsonData = JSON.parse(result.toString());
    console.log('JSON Data:', jsonData);
  } catch (error) {
    console.error('Error retrieving file from IPFS:', error.message);
  }
};

//app.use(express) //Parse JSON requests
app.get('/', (req, res) => {
  res.send("hello world!");
});

// Define a route to receive user data and call the Python AI script
//app.post('/test', (req, res) => {

  // Extract user data from the request
  //const { grade, interests } = req.body;

  // Call the Python script
  //const { spawn } = require('child_process');
  //const pythonProcess = spawn('python', ['./knn_recommendations/knn_alg.py', grade, ]);

  //pythonProcess.stdout.on('data', (data) => {
    //const recommendations = data.toString();
    // Send AI recommendations back to the frontend
    //res.json({ recommendations });
  //});
//})

app.get('/recommendations', async (req, res) => {

  // Use the CID obtained from the upload step
  var grade = req.query.grade;
  var course_data = await j.get(hash);
  var pythonProcess = spawn('python', ["/Users/matthew/Documents/F23_AI_ELearning/server/knn_recommendations/knn_alg.py", grade, JSON.stringify(course_data)]);
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
    res.send(data.toString());
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

