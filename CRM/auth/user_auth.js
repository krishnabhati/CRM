"use strict";
const jwt=require('jsonwebtoken');

exports.validateToken = (req ,res,next) => {

const authorizationHeader = req.headers.authorization;
let result

if (authorizationHeader) {
const token = req.headers.authorization.split(' ')[1]; // Bearer <token>

try {
// verify makes sure that the token hasn't expired and has been issued by us
result = jwt.verify(token, "user");

// Let's pass back the decoded token to the request object

req.token = result;

// We call next to pass execution to the subsequent middleware
next();

} catch (err) {
// Throw an error just in case anything goes wrong with verification
throw new Error(err);
}
} else {

res.send("MESSAGES=>ERROR.INVALID_TOKEN");
}
}