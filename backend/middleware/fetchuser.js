const jwt = require('jsonwebtoken');
const JWT_SECRET = "signedByRK";

// After login, whenever the user wants to access the resources of backend such as the database, we
// need to verify his/her authenticity using the token. We need to get rid of writing code for
// verifying the token in every endpoint.
// For this purpose, we define a middleware function with the template as shown below.
// Every time the user makes a get, post, etc. request to access resources that needs authentication,
// the request has to be made with a header containing the token. The endpoint defined for that request
// in the backend will contain this middleware 'fetchuser'. The middleware will verify the token and
// send the user's details to the endpoint. The endpoint can then use the id of the user to run queries
// and get data which it can send as response.
const fetchuser=(req, res, next)=>{
    try{
        const token = req.header("authToken"); // Get the token from header
        if(!token){
            return res.status(401).json({error: "Invalid token"});
        }
        const data = jwt.verify(token, JWT_SECRET); // Verify the token
        req.user = data.user; // Set user details in req.user
        next(); // Function to continue with the endpoint
    }
    catch{
        return res.status(401).json({error: "Invalid token"});
    }
};

module.exports = fetchuser;