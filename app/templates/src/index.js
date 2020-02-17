const exp = require('express');                                      // express 
const app = exp();                                                   // object of express to represent this application
const path = require('path');                                        // path for getting absolute/relative path
const bodyParser = require('body-parser');                           // to parse objects in req.body
const cors = require('cors');                                        // to connect to another platform
const routes = require('./routes/appRoute');                         // routes for functions
const PORT = <%- port %>;                                                   // port number

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));      
app.use(cors());

app.use('/', routes);
app.use('/image', exp.static(path.join(__dirname, "./images")));     //expose folder from server

app.listen(PORT, () => {                                             //application to listen to that PORT
    console.log("Server is running in localhost:" + PORT);
})