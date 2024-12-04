"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim();
const pattern = /mul\((-?\d+(\.\d+)?),(-?\d+(\.\d+)?)\)/g;

const pStart = performance.now();

const result = 
    [...INPUT.matchAll(pattern)]
        .map(x => x[0])
        .map(x => x.split(","))
        .map(x => Number(x[0].split("(")[1]) * Number(x[1].split(")")[0]))
        .reduce((acc, curr) => acc + curr, 0);

const pEnd = performance.now();

console.log("Part 1: " + result);
console.log(pEnd - pStart);
