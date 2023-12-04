"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"); // change this if necessary

const pStart = performance.now();

let result = 0;

const cleanedInput = INPUT.map(line => line.split(":")).map(values => {
    const winningNumbers = values[1].split("|")[0].split(" ").filter(val => val !== "").map(val => Number(val));
    const ownNumbers = values[1].split("|")[1].split(" ").filter(val => val !== "").map(val => Number(val));
    const id = values[0].split(" ").filter(val => val !== "");

    return {
        id: Number(id[1]),
        winningNumbers,
        ownNumbers,
    };
});

const wins = {};

for(const scratchKey of Object.keys(cleanedInput)){
    const currentScratchpad = cleanedInput[scratchKey];
    let counter = 0;
    for(const ownNumber of currentScratchpad.ownNumbers){
        if(currentScratchpad.winningNumbers.includes(ownNumber)){
            counter++;
        }
    }
    wins[currentScratchpad.id] = counter;
}

const sumObjects = {};

const getCards = (id) => {
    const scratchCardWins = wins[id];

    if(sumObjects[id] === undefined) sumObjects[id] = 0;
    sumObjects[id]++;

    for(let i = 1; i <= scratchCardWins; i++){
        getCards(id + i);
    }
};


for(let i = 1; i <= INPUT.length; i++){
    getCards(i);
}

for(const key of Object.keys(sumObjects)){
    result += sumObjects[key];
}

const pEnd = performance.now();

console.log("Total scratchcards: " + result);
console.log(pEnd - pStart);
