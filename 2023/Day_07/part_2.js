"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const _INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const INPUT = [
    "32T3K 765",
    "T55J5 684",
    "KK677 28",
    "KTJJT 220",
    "QQQJA 483",
];

const pStart = performance.now();

const STRENGTHES = {
    J: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    Q: 11,
    K: 12,
    A: 13,
};

const data = [];

const getType = (sortedHand) => {
    if(sortedHand.length === 1) return 7;
    if(sortedHand.length === 2){
        if(sortedHand[0][1] === 4) return 6;
        if(sortedHand[0][1] === 3) return 5;
    }
    if(sortedHand.length === 3){
        if(sortedHand[0][1] === 3) return 4;
        if(sortedHand[0][1] === 2 && sortedHand[1][1] === 2) return 3;
    }
    if(sortedHand.length === 4) return 2;
    if(sortedHand.length === 5){
        const charSet = new Set();
        for(const char of sortedHand){
            if(charSet.has(char)) return -1;

            charSet.add(char);
        }
        return 1;
    }

    return -1;
};

for(let i = 0; i < INPUT.length; i++){
    const line = INPUT[i];

    const splitted = line.split(" ");
    const rawHand = splitted[0];
    const bid = Number(splitted[1]);
    const occurrences = {};

    rawHand.split("").forEach(c => {
        if(occurrences[c] === undefined) occurrences[c] = 0;
        occurrences[c]++;
    });

    const type = getType(Object.entries(occurrences).sort((a, b) => b[1] - a[1]));
    data.push({
        hand: rawHand,
        bid,
        type,
    });
}

const comp = (hands) => {
    for(let i = 0; i < hands.length - 1; i++){
        for(let j = i + 1; j < hands.length; j++){
            const first = hands[i];
            const second = hands[j];

            for(let k = 0; k < first.hand.length; k++){
                const firstStrength = STRENGTHES[first.hand[k]];
                const secondStrength = STRENGTHES[second.hand[k]];

                if(firstStrength > secondStrength){
                    const temp = hands[i];
                    hands[i] = hands[j];
                    hands[j] = temp;
                    break;
                }
                else if(firstStrength < secondStrength){
                    break;
                }
            }
        }
    }
    return hands;
};

const sortDeck = (d) => {
    const sortedData = [];
    const typeObject = {1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []};

    for(let i = 0; i < Object.keys(d).length; i++){
        const key = Object.keys(d)[i];
        const value = d[key];
        typeObject[value.type].push(value);
    }

    for(const key of Object.keys(typeObject)){
        const hands = typeObject[key];
        const sorted = comp(hands);
        sorted.forEach(val => sortedData.push(val));
    }

    return sortedData;
};


const sortedDeck = sortDeck(data);

let result = 0;

for(let i = 0; i < sortedDeck.length; i++){
    const value = sortedDeck[i];
    result += ((i + 1) * value.bid);
}

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
