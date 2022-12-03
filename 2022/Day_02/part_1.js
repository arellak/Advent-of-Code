"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

let score = 0;

INPUT.map(line => line.split(" ")).forEach(line => {
    // eslint-disable-next-line no-nested-ternary
    score += line[1] === "X" ? 1 : line[1] === "Y" ? 2 : line[1] === "Z" ? 3 : 0;

    if((line[0] === "A" && line[1] === "X") || (line[0] === "B" && line[1] === "Y") || (line[0] === "C" && line[1] === "Z")){
        score += 3;
    }
    else if((line[0] === "A" && line[1] === "Y") || (line[0] === "B" && line[1] === "Z") || (line[0] === "C" && line[1] === "X")){
        score += 6;
    }
});

const result = score;

const pEnd = performance.now();

console.log("Rock Paper Scissors Part 1: " + result);
console.log(pEnd - pStart);
