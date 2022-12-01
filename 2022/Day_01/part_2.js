"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL); // change this if necessary

const pStart = performance.now();

let currentElv = 0;
let topThree = [];

INPUT.forEach(line => {
    if(line !== "") {
        currentElv += parseInt(line);
    } else {
        if(currentElv > topThree[0] || isNaN(topThree[0])) {
            topThree[2] = topThree[1];
            topThree[1] = topThree[0];
            topThree[0] = currentElv;            
        } else if(currentElv > topThree[1] || isNaN(topThree[1])) {
            topThree[2] = topThree[1];
            topThree[1] = currentElv;
        } else if(currentElv > topThree[2] || isNaN(topThree[2])) {
            topThree[2] = currentElv;
        }
        currentElv = 0;
    }
});

const result = parseInt(topThree[0]) + parseInt(topThree[1]) + parseInt(topThree[2]);

const pEnd = performance.now();

console.log("Top Three Calories: " + result);
console.log(pEnd - pStart);
