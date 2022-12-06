"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt")));

const pStart = performance.now();
let result = 0;
for(let i = 0; i < INPUT.length; i++){
    const first = INPUT[i];
    const second = INPUT[i + 1];
    const third = INPUT[i + 2];
    const fourth = INPUT[i + 3];

    if((first !== second) && (first !== third) && (first !== fourth) && (second !== third) && (second !== fourth) && (third !== fourth)){
        result = i + 4;
        break;
    }
}

const pEnd = performance.now();

console.log("Day 6 Part 1: " + result);
console.log(pEnd - pStart);
