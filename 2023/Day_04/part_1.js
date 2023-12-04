"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"); // change this if necessary

const pStart = performance.now();

let result = 0;

const cleanedInput = INPUT.map(line => line.split(":")).map(values => {
    const winningNumbers = values[1].split("|")[0].split(" ").filter(val => val !== "").map(val => Number(val));
    const ownNumbers = values[1].split("|")[1].split(" ").filter(val => val !== "").map(val => Number(val));

    return {
        id: Number(values[0].split(" ")[1]),
        winningNumbers,
        ownNumbers,
    };
});

for(const scratchKey of Object.keys(cleanedInput)){
    const currentScratchpad = cleanedInput[scratchKey];
    let counter = 0;
    for(const ownNumber of currentScratchpad.ownNumbers){
        if(currentScratchpad.winningNumbers.includes(ownNumber)){
            if(counter > 0){
                counter *= 2;
            }
            else{
                counter++;
            }
        }
    }
    result += counter;
}

const pEnd = performance.now();

console.log("Winning count: " + result);
console.log(pEnd - pStart);
