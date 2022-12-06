"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))); // change this if necessary
const [stacks, instructions] = INPUT.split("\n\n");

const pStart = performance.now();

// do all the things to parse instructions
const inst = instructions.split("\n").map(i => i.replace("move ", "").replace("from", "").replace("to", "")).filter(i => i !== "").map(i => i.split(" "));
console.log(inst);

const result = "...";

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
