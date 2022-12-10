"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n")
                .filter(x => x !== "").map(x => x.split(" ")).map(([inst, val]) => [inst, Number(val)]);

let cycles = 0;
let register = 1;

let image = "";

const pStart = performance.now();

INPUT.forEach(l => {
    if(l[0] === "noop"){
        if(cycles % 40 === 0) image += "\n";
        if(cycles % 40 === register || cycles % 40 === register - 1 || cycles % 40 === register + 1){
            image += "#";
        }
        else{
            image += ".";
        }
        cycles++;
    }
    else if(l[0] === "addx"){
        for(let i = 0; i < 2; i++){
            if(cycles % 40 === 0) image += "\n";
            if(cycles % 40 === register || cycles % 40 === register - 1 || cycles % 40 === register + 1){
                image += "#";
            }
            else{
                image += ".";
            }
            cycles++;
        }
        register += l[1];
    }
});

const pEnd = performance.now();

console.log("Day 10 Part 2: " + image);
console.log(pEnd - pStart);
