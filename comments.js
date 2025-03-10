// Create web server
// Create a web server that listens on port 3000 and serves the comments.html file. Use the comments.html file from the previous exercise.
// The comments.html file should be served as a static file. The file should be read from the file system and served as a response to the client.
// The server should respond to the following requests:
// GET /comments - Respond with the comments.html file
// GET /comments/new - Respond with a form to submit a new comment
// POST /comments - Add a new comment to the comments.html file
// The comments should be stored in the comments.json file. The comments.json file should be read from the file system and updated with the new comment.
// The comments should be stored as an array of objects with the following properties:
// id - A unique identifier for the comment
// name - The name of the commenter (required)
// comment - The comment text (required)
// The id should be generated automatically when a new comment is added. You can use the nanoid package to generate unique identifiers.
// The form to submit a new comment should have the following fields:
// Name - A text input field for the name of the commenter
// Comment - A textarea field for the comment text
// Submit - A submit button to submit the form
// The form should be submitted using the POST method to the /comments endpoint.
// The form should be validated on the server side. If the name or comment fields are missing, the server should respond with a 400 Bad Request status code and an error message.
// The comments.html file should display all the comments stored in the comments.json file.
// The comments should be displayed in reverse chronological order (newest comments first).
// The comments should be displayed as a list of comments, with each comment containing the name of the commenter and the comment text.
// The comments should be styled using CSS to make them visually appealing.

const http = require('http');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/comments') {
      fs.readFile(path.resolve(__dirname, 'comments.html'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else if (req.url === '/comments/new') {
      fs.readFile(path.resolve(__dirname, 'new-comment.html'), 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else if (req.method === 'POST') {
    if (req.url === '/comments') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const { name, comment } = JSON.parse(body);
        if (!name || !comment) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Bad Request');
        } else {
          fs.readFile(path.resolve(__dirname, 'comments.json'), 'utf8',
