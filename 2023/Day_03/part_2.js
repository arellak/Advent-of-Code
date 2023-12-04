"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"); // change this if necessary

const pStart = performance.now();

const coordinateSystem = {};
const numCoordinates = [];
const symbolCoordinates = [];

for(let y = 0; y < INPUT.length; y++){
    const lineSplit = INPUT[y].split("");
    for(let x = 0; x < lineSplit.length; x++){
        const currentValue = lineSplit[x];
        if(coordinateSystem[y] === undefined){
            coordinateSystem[y] = {};
        }
        coordinateSystem[y][x] = currentValue;
    }
}

for(let y = 0; y < INPUT.length; y++){
    const lineSplit = INPUT[y].split("");
    let x = 0;
    while(x < lineSplit.length){
        const currentValue = lineSplit[x];
        const num = [];
        if(!isNaN(Number(currentValue))){
            for(let i = x; x < lineSplit.length; i++){
                const nextValue = lineSplit[i];
                if(!isNaN(Number(nextValue))){
                    num.push({x: i, y});
                }
                else{
                    break;
                }
            }
        }
        if(num.length > 0){
            numCoordinates.push(num);
        }

        if(num.length === 0) x++;
        else x += num.length;
    }
}

for(let y = 0; y < INPUT.length; y++){
    const lineSplit = INPUT[y].split("");
    for(let x = 0; x < lineSplit.length; x++){
        const currentValue = lineSplit[x];
        if(isNaN(Number(currentValue)) && currentValue !== "." && currentValue === "*"){
            symbolCoordinates.push({x, y});
        }
    }
}

let result = 0;

for(const symbol of symbolCoordinates){
    const neighbors = [];
    for(const numCoordinateArray of numCoordinates){
        for(const numCoord of numCoordinateArray){
            const diagonalTopLeft = (numCoord.x - 1 === symbol.x && numCoord.y - 1 === symbol.y);
            const left = (numCoord.x - 1 === symbol.x && numCoord.y === symbol.y);
            const diagonalBottomLeft = (numCoord.x - 1 === symbol.x && numCoord.y + 1 === symbol.y);
            const bottom = (numCoord.x === symbol.x && numCoord.y + 1 === symbol.y);
            const diagonalBottomRight = (numCoord.x + 1 === symbol.x && numCoord.y + 1 === symbol.y);
            const right = (numCoord.x + 1 === symbol.x && numCoord.y === symbol.y);
            const diagonalTopRight = (numCoord.x + 1 === symbol.x && numCoord.y - 1 === symbol.y);
            const top = (numCoord.x === symbol.x && numCoord.y - 1 === symbol.y);

            if(diagonalTopLeft || left || diagonalBottomLeft || bottom || diagonalBottomRight || right || diagonalTopRight || top){
                let number = "";
                for(const numKey of Object.keys(numCoordinateArray)){
                    const tempNum = coordinateSystem[numCoordinateArray[numKey].y][numCoordinateArray[numKey].x];
                    number += tempNum.toString();
                }
                if(!neighbors.includes(Number(number))){
                    neighbors.push(Number(number));
                }
            }
        }
    }
    if(neighbors.length === 2){
        result += neighbors[0] * neighbors[1];
    }
}

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
