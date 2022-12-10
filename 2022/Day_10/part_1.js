"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n")
                .filter(x => x !== "").map(x => x.split(" ")).map(([inst, val]) => [inst, Number(val)]);

let cycles = 0;
let signalStrengthes = [];
let register = 1;

const pStart = performance.now();

INPUT.forEach(l => {
    if(l[0] === "noop"){
        cycles++;
        if(cycles === 20){
            signalStrengthes[0] = 20 * register;
        }
        else if(cycles === 60){
            signalStrengthes[1] = 60 * register;
        }
        else if(cycles === 100){
            signalStrengthes[2] = 100 * register;
        }
        else if(cycles === 140){
            signalStrengthes[3] = 140 * register;
        }
        else if(cycles === 180){
            signalStrengthes[4] = 180 * register;
        }
        else if(cycles === 220){
            signalStrengthes[5] = 220 * register;
        }
    }
    else if(l[0] === "addx"){
        for(let i = 0; i < 2; i++){
            cycles++;
            if(cycles === 20){
                signalStrengthes[0] = 20 * register;
            }
            else if(cycles === 60){
                signalStrengthes[1] = 60 * register;
            }
            else if(cycles === 100){
                signalStrengthes[2] = 100 * register;
            }
            else if(cycles === 140){
                signalStrengthes[3] = 140 * register;
            }
            else if(cycles === 180){
                signalStrengthes[4] = 180 * register;
            }
            else if(cycles === 220){
                signalStrengthes[5] = 220 * register;
            }
        }
        register += l[1];
    }
});
const reso = signalStrengthes[0] + signalStrengthes[1] + signalStrengthes[2] + signalStrengthes[3] + signalStrengthes[4] + signalStrengthes[5];

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + reso);
console.log(pEnd - pStart);
