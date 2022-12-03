"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

let score = 0;

for(let i = 0; i < INPUT.length; i+=3) {
    const first = INPUT[i];
    const second = INPUT[i+1];
    const third = INPUT[i+2];

    for(const ch of first) {
        if(second.includes(ch) && third.includes(ch)) {
            if(ch.match(/[A-Z]/)) {
                score += ch.charCodeAt(0) - 38;
            } else {
                score += ch.charCodeAt(0) - 96;
            }
            break;
        }
    }
}

const pEnd = performance.now();

console.log("Day 3 Part 2: " + score);
console.log(pEnd - pStart);
