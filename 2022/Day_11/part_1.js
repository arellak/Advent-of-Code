"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n\n"); // .map(x => x.split("\n"))

const pStart = performance.now();

const monkeys = {};

// initialize monkeys
for(let i = 0; i < INPUT.length; i++){
    if(!monkeys[i]){
        const lines = INPUT[i].split("\n");
        // const monkeyNumber = Number(lines[0].split(" ")[1].replace(":", ""));
        let startingItems = lines[1].split(":")[1].trim().split(",").map(x => x.trim()).map(x => Number(x));
        const operation = lines[2].split("=")[1].trim();
        const testDivisor = Number(lines[3].match(/\d+/)[0]);
        const trueMonkey = Number(lines[4].match(/\d+/)[0]);
        const falseMonkey = Number(lines[5].match(/\d+/)[0]);

        monkeys[i] = {};
        monkeys[i].items = startingItems;
        monkeys[i].operation = operation;
        monkeys[i].divisor = testDivisor;
        monkeys[i].trueMonkey = trueMonkey;
        monkeys[i].falseMonkey = falseMonkey;
        monkeys[i].inspections = 0;
    }
}

for(const key in monkeys){
    const monkey = monkeys[key];

    let itemLength = Number(monkey.inspections) + monkey.items.length;
    monkey.inspections += itemLength;

    monkey.items = monkey.items.map(x => parseInt(x/3, 10));

    for(let i = 0; i < monkey.items.length; i++){
        monkey.items[i] = Number(eval(`${monkey.operation.replaceAll("old", monkey.items[i])}`));
        console.log(eval(`${monkey.operation.replaceAll("old", monkey.items[i])}`));
    }
    console.log(monkey.items);

    const trueItems = monkey.items.filter(x => x % monkey.divisor === 0);
    const falseItems = monkey.items.filter(x => x % monkey.divisor !== 0);

    monkeys[monkey.trueMonkey].items.push(...trueItems);
    monkeys[monkey.falseMonkey].items.push(...falseItems);
    
    monkey.items = [];
}

// for(let i = 0; i < 20; i++){
    // INPUT.forEach(monkey => {
    //     const lines = monkey.split("\n");
    //     const monkeyNumber = Number(lines[0].split(" ")[1].replace(":", ""));
    //     let startingItems = lines[1].split(":")[1].trim().split(",").map(x => x.trim()).map(x => Number(x));
    //     const operation = lines[2].split("=")[1].trim();
    //     const testDivisor = Number(lines[3].match(/\d+/)[0]);
    //     const trueMonkey = Number(lines[4].match(/\d+/)[0]);
    //     const falseMonkey = Number(lines[5].match(/\d+/)[0]);
        
    //     let itemLength = 0;
    //     if(!isNaN(monkeys[monkeyNumber].inspections)){
    //         itemLength += Number(monkeys[monkeyNumber].inspections);
    //     }
    //     itemLength += startingItems.length;

    //     startingItems = startingItems.map(x => parseInt(x/3, 10));

    //     for(let i = 0; i < startingItems.length; i++){
    //         eval(`startingItems[${i}] = ${operation.replaceAll("old", startingItems[i])}`);
    //     }
    //     const trueItems = startingItems.filter(x => x % testDivisor === 0);
    //     const falseItems = startingItems.filter(x => x % testDivisor !== 0);
    //     console.log(`${trueItems.length} <=> ${falseItems.length}`);
    //     monkeys[trueMonkey].push(...trueItems);
    //     monkeys[falseMonkey].push(...falseItems);
        
    //     monkeys[monkeyNumber] = [];
    //     monkeys[monkeyNumber].inspections = 0;

    //     if(!isNaN(itemLength)){
    //         monkeys[monkeyNumber].inspections += Number(itemLength);
    //     }
    // });
// }

// console.log(monkeys);

const result = "...";

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
