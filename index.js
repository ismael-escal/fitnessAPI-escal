// Basic Express JS Server Setup
// [SECTION] Dependencies and Modules
const express = require('express'); // for creating an express server
const mongoose = require('mongoose'); // for Schema to model the data structure and manipulate db

// [SECTION] Server Setup
const app = express(); // setup the server
const port = 4000; // assigning port number for server to listen

// [SECTION] Middlewares
app.use(express.json()); // read json data and convert it to a JS object
app.use(express.urlencoded({extended: true})); // to receive information in other data types such us objects


// [SECTION] Database Connection
mongoose.connect('mongodb+srv://admin:admin1234@escaldb.lptqzv2.mongodb.net/Fitness-Tracker-API?retryWrites=true&w=majority&appName=escalDB'); // connect application to Database

let db = mongoose.connection; // checks if connection to MongoDB Atlas is success or not

db.on('error', console.error.bind(console, 'connection error')) // if failed connection
db.once('open', () =>  console.log(`We're connected to MongoDB Atlas`)); // if success connection


//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);


// [SECTION] Server Gateway Response
if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app, mongoose};