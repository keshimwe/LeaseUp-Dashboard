"use strict";

const express = require("express")
const app = express()
const cors = require("cors")
const units = require("./data/units.json") 
const fs = require("fs")

app.use(cors());
app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 5050;
app.get(`/api/units`, (req, res) => {
    res.json(units);
});

app.get("/api/units/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const unit = units.find(unit => unit.id === id)

    if (!unit) {
        return res.status(404).json({message: "Unit not found"})
    }
    res.json(unit)
})

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});