import express from "express";
import cors from 'cors';
import { create } from 'ipfs-http-client';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json())

//app.use(express) //Parse JSON requests
app.get('/', (req, res) => {
  res.send("hello world!");
});

// Define a route to receive user data and call the Python AI script
app.post('/test', (req, res) => {

  // Extract user data from the request
  const { grade, interests } = req.body;

  // Call the Python script
  const { spawn } = require('child_process');
  const pythonProcess = spawn('python', ['./knn_recommendations/knn_alg.py', grade, interests]);

  pythonProcess.stdout.on('data', (data) => {
    const recommendations = data.toString();
    // Send AI recommendations back to the frontend
    res.json({ recommendations });
  });
})

app.get('/recommendations', (req, res) => {
  const ipfsClient = create(new URL('http://127.0.0.1:8080'));

  const retrieveFileFromIPFS = async (cid) => {
    try {
      const result = await ipfsClient.cat(cid);
      console.log('File content:', result.toString());
    } catch (error) {
      console.error('Error retrieving file from IPFS:', error.message);
    }
  };

  // Use the CID obtained from the upload step
  const cid = 'your_cid_here';
  retrieveFileFromIPFS(cid);


  var grade = req.query.grade;
  console.log(grade);
  var spawn = require('child_process').spawn;
  var pythonProcess = spawn('python', ["/Users/matthew/Documents/F23_AI_ELearning/server/knn_recommendations/knn_alg.py", grade]);
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
    res.send(data.toString());
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

