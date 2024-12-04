"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim();
const pattern = /(don't|do)|mul\((-?\d+(\.\d+)?),(-?\d+(\.\d+)?)\)/g;

const pStart = performance.now();

const matches = [...INPUT.matchAll(pattern)].map(x => x[0]);
const actualMatches = [];

let exclude = false;
for(let i = 0; i < matches.length; i++){
    const ma = matches[i];
    if(ma === "don't"){
        exclude = true;
        continue;
    }
    if(ma === "do"){
        exclude = false;
        continue;
    }

    if(!exclude){
        actualMatches.push(ma);
    }
}

const result = actualMatches
        .map(x => x.split(","))
        .map(x => Number(x[0].split("(")[1]) * Number(x[1].split(")")[0]))
        .reduce((acc, curr) => acc + curr, 0);

const pEnd = performance.now();

console.log("Part 2: " + result);
console.log(pEnd - pStart);
