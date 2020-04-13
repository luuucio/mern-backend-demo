# MERN backend demo

A simple but feature complete backend, with authentication and authorization

# Walkthrough

## Initialization

Create package.json

```
npm init -y
```

Initialize GIT

```
git init
```

## Libraries

```
npm i express bcryptjs jsonwebtoken config express-validator mongoose
```

For development:

```
npm i -D nodemon
```

## .gitignore

Put the node_modules directory in the .gitignore

## Modify package.json

```json
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Create server.js in the root directory, which is mainly an entry point

## server.js

Setup

```js
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
```

Define a basic endpoint

```js
app.get("/", (req, res) =>
  res.json({ message: "Welcome to the MERN backend demo" })
);
```

Define the route

```js
app.use("/api/users", require("./routes/users"));
```

Start listening

```js
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

## Routes

Create the "routes" folder and the files with the users.js file

### users.js

Basic setup for POST

```js
const express = require("express");
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post("/", (req, res) => {
  res.send("Register a user");
});

module.exports = router;
```

# Setup the database

Create the config folder in the root folder
Add the file default.json with the default variables

```json
{
  "MongoURI": YOUR_CONNECTION_TO_MONGODB,
  "jwtSecret": STRING_FOR_PASSWORD_HASHING
}
```

Add the db.js file for Mongoose and import the connectDB function in server.js

# Models

Create the Models folder in the root folder

## User model

Create the User.js file in the Models folder

# Middleware

Create the auth.js middleware

# Routes

## Authentication

Create the auth.js route.

Add the route to server.js

```js
app.use("/api/auth", require("./routes/auth"));
```

## routes/users.js

Add the new imports on users.js

```js
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../models/User");
```

and complete the routes
