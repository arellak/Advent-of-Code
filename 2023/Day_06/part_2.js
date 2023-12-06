"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

let result = 0;

const reworkedInput = INPUT.map(line => line.split(":")).map(line => line[1].trim()).map(line => {
    const l = line.split(" ").filter(val => val !== "");
    let conc = "";
    for(const value of l){
        conc += value;
    }
    return Number(conc);
});

const recordTime = reworkedInput[0];
const recordDistance = reworkedInput[1];
let maximumWins = 0;

for(let j = 0; j < recordTime; j++){
    if(j === 0 || j >= recordTime) continue;
    if(j * (recordTime - j) > recordDistance) maximumWins++;
}

result = maximumWins;
const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
