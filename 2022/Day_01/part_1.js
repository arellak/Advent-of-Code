"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL); // change this if necessary

const pStart = performance.now();

let maxCalories = 0;
let currentElv = 0;

INPUT.forEach(line => {
    if(line !== ""){
        currentElv += parseInt(line, 10);
    }
    else {
        // check if current elv has more calories than the current maximum
        if(currentElv > maxCalories) maxCalories = currentElv;
        currentElv = 0;
    }
});

const result = maxCalories;

const pEnd = performance.now();

console.log("Max Calories: " + result);
console.log(pEnd - pStart);
