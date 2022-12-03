"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

let score = 0;

INPUT.forEach(line => {
    let partOne = line.slice(0, (line.length/2));
    let partTwo = line.slice((line.length/2));

    for(const ch of partOne) {
        if(partTwo.includes(ch)) {
            if(ch.match(/[A-Z]/)) {
                score += ch.charCodeAt(0) - 38;
            } else {
                score += ch.charCodeAt(0) - 96;
            }
            break;
        }
    }
});

const pEnd = performance.now();

console.log("Day 3 Part 1: " + score);
console.log(pEnd - pStart);
