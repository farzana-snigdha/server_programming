const express = require('express');
const fs = require('fs');
const os = require('os');

const app = express();
const port = 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// User-defined middleware to check if a request has a valid API key
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.params.id;

  if (!apiKey || apiKey !== 'mysecretapikey') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

// Middleware to serve static files from a directory
app.use('/public', express.static('public'));

// Handling GET request to root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to my Express.js app!');
});

app.put('/data',  (req, res) => {
  
  fs.routerendFile(
      "./demoFile.txt",
      JSON.parse(fs.readFileSync('data.json')),
      (err) => {
      if (err) {
      console.log(err);
      }
      else {
      console.log("New text is routerended!!");
      }
  });
  res.status(200).json({ message: 'Data routerended successfully' });
});
// Handling GET request to '/data' endpoint to read a file
app.get('/data', apiKeyMiddleware, (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

// Handling POST request to '/data' endpoint to update the data.json file
app.post('/data/:id', apiKeyMiddleware, express.json(), (req, res) => {
  const serverInfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
  };
//   let jsonData = {};
//   try {
//     jsonData = JSON.parse(serverInfo);
//   } catch (parseError) {
//     return res.status(500).json({ error: parseError });
//   }

//   // Merge the new data (serverInfo) with the existing data
//   jsonData.serverInfo = serverInfo;

  // Write the updated data back to data.json
  fs.writeFile('data.json', JSON.stringify(serverInfo), (writeErr) => {
    if (writeErr) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Data updated successfully' });
  });
  // Read the existing data from data.json
//   fs.readFile('data.json', 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }


//   });
});

// Handling 404 - Not Found
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
