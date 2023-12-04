"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

let INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

// @ts-ignore
INPUT = INPUT.map(line => {
    const splitted = line.split(":");
    const gameId = Number(splitted[0].split(" ")[1]);
    const content = splitted[1];

    let isValid = true;

    content.split(";").map(subset => subset.trim()).forEach(subset => {
        let greens = 0;
        let reds = 0;
        let blues = 0;
        subset.split(",").map(val => val.trim().split(" ")).forEach(val => {
            const amount = Number(val[0]);
            const color = val[1];
            if(color === "green"){
                greens += amount;
            }
            else if(color === "red"){
                reds += amount;
            }
            else if(color === "blue"){
                blues += amount;
            }
        });

        if(!(reds <= 12 && greens <= 13 && blues <= 14)){
            isValid = false;
            return;
        }
    });

    return isValid ? {gameId} : {};
});

let result = 0;
for(const key in Object.keys(INPUT)){
    // @ts-ignore
    if(INPUT[key].gameId === undefined) continue;
    // @ts-ignore
    result += INPUT[key].gameId;
}

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
