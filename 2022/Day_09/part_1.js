"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n")
                .map(x => x.split(" ")).map(x=> [x[0], Number(x[1])]);

let headPos = [0, 0];
let tailPos = [0, 0];

let visitedPositions = {};

const pStart = performance.now();

INPUT.forEach(x => {
    switch(x[0]){
        case "L":
            headPos[0] -= x[1];
            break;
        case "R":
            headPos[0] += x[1];
            break;
        case "U":
            headPos[1] += x[1];
            break;
        case "D":
            headPos[1] -= x[1];
            break;
    }
});

const result = "Test";

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
