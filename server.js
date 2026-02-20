"use strict";

const express = require("express");
const app = express();
const cors = require("cors")
const units = require("./units.json")

app.use(cors())
//app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 5050;
app.get("/", (req, res) => {
    res.send("We are up!")
})
app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});