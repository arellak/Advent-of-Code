"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n")
                .map(l => l.split("")).map(l => l.map(x => Number(x)));

let visibleTrees = 0;

const pStart = performance.now();

for(let x = 0; x < INPUT[0].length; x++){
    for(let y = 0; y < INPUT.length; y++){
        const currentPos = INPUT[y][x];
        // 0 = left, 1 = right, 2 = top, 3 = down
        const visible = [true, true, true, true];
        
        if(x < INPUT[0].length-1){
            for(let checkX = x+1; checkX < INPUT[0].length; checkX++){
                if(INPUT[y][checkX] >= currentPos){
                    visible[1] = false;
                    break;
                }
            }
        }
        
        if(x > 0){
            for(let checkX = x-1; checkX > 0; checkX--){
                if(INPUT[y][checkX] >= currentPos){
                    visible[0] = false;
                    break;
                }
            }
        }

        // check y directions
        if(y < INPUT.length-1){
            for(let checkY = y+1; checkY < INPUT.length; checkY++){
                if(INPUT[checkY][x] >= currentPos){
                    visible[3] = false;
                    break;
                }
            }
        }
        if(y > 0){
            for(let checkY = y-1; checkY > 0; checkY--){
                if(INPUT[checkY][x] >= currentPos){
                    visible[2] = false;
                    break;
                }
            }
        }
        // console.log(visible);
        if(visible.filter(v => v === true).length > 0) visibleTrees++;
    }
}

console.log(visibleTrees);

const result = "...";

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);