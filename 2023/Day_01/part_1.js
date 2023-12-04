"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"); // change this if necessary

const pStart = performance.now();
const tempResult = 0;
const result = INPUT.reduce(
    (acc, current) => {
        const chars = current.split("");
        const nums = [];
        for(let i = 0; i < chars.length; i++){
            if(!isNaN(Number(chars[i]))){
                nums.push(chars[i]);
            }
        }
        let num;
        if(nums.length > 1){
            num = nums[0] + nums[nums.length - 1];
        }
        else{
            num = nums[0] + nums[0];
        }

        return acc + Number(num);
    },
    tempResult,
);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
