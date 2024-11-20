const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {swasthyaModel} = require('./models/swasthya');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from Vite
}));

// Connect to MongoDB with error handling
mongoose.connect("mongodb+srv://ankitaniket:ankitaniket@atlascluster.bmejv7a.mongodb.net/swasthy?retryWrites=true&w=majority&appName=AtlasCluster")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Error connecting to MongoDB:", err));

app.get('/', (req, res) => {
    res.send({
        message: "done"
    })
})

// // Registration route with validation and error handling
// app.post('/register', async function  (req, res) {
//     try {
//         const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//         res.status(400).json({ error: "All fields are required." });
//     }

//     await swasthyaModel.save(req.body)
//         .then(user => res.status(201).json(user))
//         .catch((err) => {
//             console.log(err)
//             res.status(500).json({ error: err.message })
//         } );
//     } catch(err) {
//         res.status(404).json({
//             message: err
//         })
//     }
// });

// Registration route
app.post('/register', async function (req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required: name, email, and password."
            });
        } 
        const result = await swasthyaModel.create({
            name: name,
            email: email,
            password: password
        });

        console.log(result);
        return res.status(201).json({
            message: "Successfully registered."
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            error: "Something went wrong. Please try again.",
            details: err.message 
        });
    }
});


// Start the server
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
