"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const numberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"); // change this if necessary

const pStart = performance.now();

const tempResult = 0;
const nums = [];
INPUT.forEach(line => {
    const lineNums = [];
    const lineSplit = line.split("");

    for(let i = 0; i < lineSplit.length; i++){
        const currentChar = lineSplit[i];
        if(!isNaN(Number(currentChar))){
            lineNums.push(currentChar);
            continue;
        }

        // check if current index + n equals any of the keys in `numberMap`
        const maxOffset = 5;
        let word = "";
        for(let j = i; j < (i + maxOffset); j++){
            word += lineSplit[j];
            if(numberMap[word] !== undefined){
                lineNums.push(numberMap[word].toString());
                break;
            }
        }
    }

    nums.push(lineNums);
});

const result = nums.map(line => {
    const first = line[0];
    const last = line[line.length - 1];
    return Number(first + last);
}).reduce((acc, current) => acc + current, tempResult);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
