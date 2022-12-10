"use strict";

const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))); // change this if necessary
const [stackTower, instructions] = INPUT.split("\n\n");

const stacks = {}; 

const pStart = performance.now();

for(let i = stackTower.split("\n").length - 2; i >= 0; i--){
    const line = stackTower.split("\n")[i];
    for(let j = 1; j < line.length; j += 4){
        let letter = line[j];
        if(!stacks[Math.round(j/4)]){
            stacks[Math.round(j/4)] = [];
        }
        if(letter !== " "){
            stacks[Math.round(j/4)].push(letter);
        }
    }
}


instructions.split("\n").forEach(l => {
    const count = Number(l.split(" ")[1]);
    const from = Number(l.split(" ")[3]) - 1;
    const to = Number(l.split(" ")[5]) - 1;
    for(let i = 0; i < count; i++){
        stacks[to][stacks[to].length] = stacks[from][stacks[from].length-1];
        stacks[from].pop();
    }
});

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + stacks);
console.log(pEnd - pStart);
