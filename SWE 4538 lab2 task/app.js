const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

const userFilePath = "./users.json";

// Load user data from the JSON file (if it exists)
let users = [];
if (fs.existsSync(userFilePath)) {
  const userData = fs.readFileSync(userFilePath, "utf8");
  users = JSON.parse(userData);
}

// Middleware to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Authentication failed" });
  }

  req.user = user;
  next();
};

// User Signup
app.post("/signup", (req, res) => {
  const { email, username, password } = req.body;

  // Check if the email is already registered
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Save user data (including OS-related information) to the JSON file
  users.push({ email, username, password });
  fs.writeFile(userFilePath, JSON.stringify(users, null, 2), (err) => {
    console.log(users);
  });

  res.status(201).json({ message: "User registered successfully" });
});

// User Login
app.post("/login", isAuthenticated, (req, res) => {
  const username = req.user.username;

  // Send an HTML file as a response
  res.sendFile(__dirname + "/welcome.html", (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(`Sent welcome.html to ${username}`);
    }
  });
});

// Password Reset
app.put("/reset-password", isAuthenticated, (req, res) => {
  const { newPassword, previousPassword } = req.body;

  // Verify the previous password
  if (req.user.password !== previousPassword) {
    return res.status(400).json({ error: "Incorrect previous password" });
  }

  // Update the password in the user data
  req.user.password = newPassword;

  // Update the JSON file with the modified user data
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));

  res.json({ message: "Password reset successful" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Catch-All Middleware for 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
