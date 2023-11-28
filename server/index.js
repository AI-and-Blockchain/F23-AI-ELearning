import express from "express";
import cors from 'cors';
import { createHelia } from 'helia';
import { json } from '@helia/json';
import { spawn } from 'child_process';
import CourseData from './knn_recommendations/course_data.json' assert { type: "json" };
import UserData from './knn_recommendations/user_data.json' assert { type: "json" };
import fs from 'fs';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json())

const helia = await createHelia();
const j = json(helia);
var courseHash = await j.add(CourseData);
var userHash = await j.add(UserData);

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

// Upload the modified JSON file to Helia IPFS
async function uploadModifiedFile() {
  const data = fs.readFileSync('/Users/matthew/Documents/F23_AI_ELearning/server/knn_recommendations/user_data.json');
  const result = await ipfs.add({ content: data });
  return result.cid;
}

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
  var course_data = await j.get(courseHash);
  var user_data = await j.get(userHash);
  var pythonProcess = spawn('python', ["/Users/matthew/Documents/F23_AI_ELearning/server/knn_recommendations/knn_alg.py", grade, JSON.stringify(course_data), JSON.stringify(user_data)]);
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
    res.send(data.toString());
  });
});

app.get('/signedIn', async (req, res) => {
  var address = req.query.Address;
  var user_data = await j.get(userHash);
  var pythonProcess = spawn('python', ["/Users/matthew/Documents/F23_AI_ELearning/server/knn_recommendations/UserData.py", address, JSON.stringify(user_data)]);
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
    res.send(data.toString());
  });
  pythonProcess.stderr.setEncoding('utf8');
  pythonProcess.stderr.on('data', function(data) {
    //Here is where the error output goes

    console.log('stderr: ' + data);
    res.send(data.toString());
  });
  //var userHash = await uploadModifiedFiles();
  //console.log('new user hash: ' + userHash);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

