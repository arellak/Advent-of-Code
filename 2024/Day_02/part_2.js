"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();
let result = 0;
const unsafeReports = [];

for(const report of INPUT){
    const steps = report.split(" ").map(Number);
    let isIncreasing = false;
    let isDecreasing = false;
    for(let i = 0; i < steps.length - 1; i++){
        const step = steps[i];
        const nextStep = steps[i+1];
        if(step < nextStep && (nextStep - step >= 1 && nextStep - step <= 3)){
            if(isDecreasing){
                isIncreasing = false;
                isDecreasing = false;
                break; // is unsafe because it switched in the middle
            }
            isIncreasing = true;
        }
        else if(step > nextStep && (step - nextStep >= 1 && step - nextStep <= 3)){
            if(isIncreasing){
                isIncreasing = false;
                isDecreasing = false;
                break; // is unsafe
            }
            isDecreasing = true;
        }
        else{
            // is unsafe
            isIncreasing = false;
            isDecreasing = false;
            break;
        }
    }

    if(isIncreasing || isDecreasing){
        result++;
        continue;
    }
    else{
        unsafeReports.push(report);
    }
}

console.log(unsafeReports.length);

for(const report of unsafeReports){
    const steps = report.split(" ").map(Number);
    let skip = 0;

    while(skip < steps.length){
        const filteredSteps = steps.filter((_, index) => index !== skip);
        let isValid = true;
        let isIncreasing = false;
        let isDecreasing = false;

        for(let i = 0; i < filteredSteps.length - 1; i++){
            const step = filteredSteps[i];
            const nextStep = filteredSteps[i+1];
            if(step < nextStep && nextStep - step >= 1 && nextStep - step <= 3){
                if(isDecreasing){
                    isValid = false;
                    break;
                }
                isIncreasing = true;
            }
            else if(step > nextStep && step - nextStep >= 1 && step - nextStep <= 3){
                if(isIncreasing){
                    isValid = false;
                    break;
                }
                isDecreasing = true;
            }
            else{
                isValid = false;
                break;
            }
        }
        if(isValid){
            result++;
            break;
        }
        skip++;
    }
}
const pEnd = performance.now();

console.log("Part 2: " + result);
console.log(pEnd - pStart);
