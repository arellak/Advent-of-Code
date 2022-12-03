/* eslint-disable no-nested-ternary */
"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

let score = 0;

INPUT.map(line => line.split(" ")).forEach(line => {
    score += line[1] === "X" ? line[0] === "A" ? 3 : line[0] === "B" ? 1 : line[0] === "C" ? 2 : 0
        : line[1] === "Y" ? 3 + (line[0] === "A" ? 1 : line[0] === "B" ? 2 : line[0] === "C" ? 3 : 0)
            : line[1] === "Z" ? 6 + (line[0] === "A" ? 2 : line[0] === "B" ? 3 : line[0] === "C" ? 1 : 0) : 0;
});

const result = score;

const pEnd = performance.now();

console.log("Rock Paper Scissors Part 2: " + result);
console.log(pEnd - pStart);
