"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

let INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

// @ts-ignore
INPUT = INPUT.map(line => {
    const splitted = line.split(":");
    const content = splitted[1];

    let greens = undefined;
    let reds = undefined;
    let blues = undefined;

    content.split(";").map(subset => subset.trim()).forEach(subset => {
        subset.split(",").map(val => val.trim().split(" ")).forEach(val => {
            const amount = Number(val[0]);
            const color = val[1];
            if(color === "green" && (amount > greens || greens === undefined)){
                greens = amount;
            }
            else if(color === "red" && (amount > reds || reds === undefined)){
                reds = amount;
            }
            else if(color === "blue" && (amount > blues || blues === undefined)){
                blues = amount;
            }
        });
    });

    return (greens ?? 1) * (reds ?? 1) * (blues ?? 1);
});

let result = 0;
for(const key in Object.keys(INPUT)){
    // @ts-ignore
    result += INPUT[key];
}

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
