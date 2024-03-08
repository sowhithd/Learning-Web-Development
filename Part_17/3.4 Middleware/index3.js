import express from "express";

const app = express();
const port = 3000;

/*
we've actually replicated some of the functionality of morgan by creating this middleware ourselves and then using the 
app.use() method, we're able to specify the middleware that we want to be implemented

This line registers a custom middleware function named logger as a global middleware. 
Middleware functions are essentially functions that provide ways to intercept, modify, or extend the request and response 
objects before they are passed to the actual route handlers. In this case, the logger middleware will be executed for every 
incoming request to the server, regardless of the specific route being accessed.
*/

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* 
This function defines the logger middleware that was earlier registered using app.use(). It receives three arguments:

request: The same request object passed to route handler functions.
response: The same response object passed to route handler functions.
next: A function that must be called to continue processing the request and pass control to the next middleware 
or route handler in the stack.

The next function in the provided code snippet is not an inbuilt keyword for any method in JavaScript or Express.js. 
It's a convention specifically used within middleware functions in Express.js to signal that the middleware has finished 
its processing and wants to hand over control to the next middleware or route handler in the stack.

If you don't call next() within your middleware function, the processing for that request gets stuck at that point,
and no subsequent middleware or route handlers will be called.

Therefore, calling next() is crucial for ensuring the proper execution flow of middleware functions in Express.js. 
It's not a general-purpose keyword, but rather a convention specific to this framework.


*/
function logger(request,response,next){
  console.log("Request Method: ",request.method);
  console.log("Request URL: ",request.url);
  next();
}
