"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split("\n"); // change this if necessary

const pStart = performance.now();

let score = 0;

INPUT.map(pair => pair.split(",")).filter(pair => pair[0] !== "" && pair[1] !== "").forEach(pair => {
    const firstStart = parseInt(pair[0].split("-")[0], 10);
    const firstEnd = parseInt(pair[0].split("-")[1], 10);
    const secondStart = parseInt(pair[1].split("-")[0], 10);
    const secondEnd = parseInt(pair[1].split("-")[1], 10);

    let shit = false;
    for(let i = firstStart; i <= firstEnd; i++){ // loop over left part of pair
        for(let j = secondStart; j <= secondEnd; j++){ // loop over right part of pair
            if(i === j){
                score++;
                shit = true;
                break;
            }
        }
        if(shit){
            shit = false;
            break;
        }
    }
});

const pEnd = performance.now();

console.log("Day 4 Part Two: " + score);
console.log(pEnd - pStart);
