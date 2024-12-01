"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n").map(x => {
    const splitted = x.split(" ");
    return splitted.filter(x => x !== "").map(Number);
});

let leftList = [];
let rightList = [];

const pStart = performance.now();

INPUT.forEach(value => {
    leftList.push(value[0]);
    rightList.push(value[1]);
});

leftList = leftList.sort();
rightList = rightList.sort();

let result = 0;
leftList.forEach((leftValue, index) => {
    const rightValue = rightList[index];

    if(rightValue > leftValue){
        result += rightValue - leftValue;
    }
    else if(leftValue > rightValue){
        result += leftValue - rightValue;
    }
});

const pEnd = performance.now();

console.log("Part 2: " + result);
console.log(pEnd - pStart);
