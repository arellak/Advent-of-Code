"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

let score = 0;

INPUT.map(pair => pair.split(",")).filter(pair => pair[0] !== "" && pair[1] !== "").forEach(pair => {
    const firstStart = parseInt(pair[0].split("-")[0], 10);
    const firstEnd = parseInt(pair[0].split("-")[1], 10);
    const secondStart = parseInt(pair[1].split("-")[0], 10);
    const secondEnd = parseInt(pair[1].split("-")[1], 10);

    if((firstStart >= secondStart && firstEnd <= secondEnd) || (secondStart >= firstStart && secondEnd <= firstEnd)){
        score++;
    }
});

const pEnd = performance.now();

console.log("Day 4 Part 1: " + score);
console.log(pEnd - pStart);
