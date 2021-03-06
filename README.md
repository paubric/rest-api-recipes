# RESTful API recipes
## Introduction
Short collection of basic steps of a RESTful API implementation in Node.js with generic components named accordingly.

## Samples
- **Plain Response** - Will answer every request with a standard response
- **Basic Routing** - Will answer requests to the implemented resources accordingly, with clear messages
- **Basic Routing - Logging, Errors, Nodemon** - Same as the above, with logging, error handling and nodemon
- **Body Parsing - CORS** - Similar with the above, with parsed requests and disabled CORS
- **MongoDB Operations** - Functional basic MongoDB API
- **MongoDB Operations - Validation, Better Responses** - Same as the above, with validation and better responses
- **MongoDB Operations - Relationship** - Same as the above, with a parent resource and relations
- **MongoDB Operations - Files** - Same as the above, with resourceImage

## Usage
Launch any of the variants with the following command: 
```
node server.py
```
Launch any of the variants, except the first two, with the following command, to automatically restart the server on save:
```
npm start
```
