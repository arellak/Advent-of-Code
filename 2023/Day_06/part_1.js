"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

let result = [];

// @ts-ignore
const reworkedInput = INPUT.map(line => line.split(":")).map(line => [line[0], line[1].trim()]).map(line => [line[0], line[1].split(" ")]).map(line => [line[0], line[1].filter(l => l !== "").map(l => Number(l))]);

for(let i = 0; i < reworkedInput[0][1].length; i++){
    const recordTime = reworkedInput[0][1][i];
    const recordDistance = reworkedInput[1][1][i];
    let maximumWins = 0;

    for(let j = 0; j < recordTime; j++){
        if(j === 0 || j >= recordTime) continue;
        if(j * (recordTime - j) > recordDistance) maximumWins++;
    }

    result.push(maximumWins);
}
// @ts-ignore
result = result.reduce((acc, curr) => acc * curr, 1);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
