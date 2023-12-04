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
        if(isNaN(Number(currentValue)) && currentValue !== "."){
            symbolCoordinates.push({x, y});
        }
    }
}

let result = 0;

numCoordinates.forEach(num => {
    for(const numCoordinate of num){
        let valid = false;
        for(const key of Object.keys(symbolCoordinates)){
            const symbol = symbolCoordinates[key];
            const diagonalTopLeft = (numCoordinate.x - 1 === symbol.x && numCoordinate.y - 1 === symbol.y);
            const left = (numCoordinate.x - 1 === symbol.x && numCoordinate.y === symbol.y);
            const diagonalBottomLeft = (numCoordinate.x - 1 === symbol.x && numCoordinate.y + 1 === symbol.y);
            const bottom = (numCoordinate.x === symbol.x && numCoordinate.y + 1 === symbol.y);
            const diagonalBottomRight = (numCoordinate.x + 1 === symbol.x && numCoordinate.y + 1 === symbol.y);
            const right = (numCoordinate.x + 1 === symbol.x && numCoordinate.y === symbol.y);
            const diagonalTopRight = (numCoordinate.x + 1 === symbol.x && numCoordinate.y - 1 === symbol.y);
            const top = (numCoordinate.x === symbol.x && numCoordinate.y - 1 === symbol.y);

            if(diagonalTopLeft || left || diagonalBottomLeft || bottom || diagonalBottomRight || right || diagonalTopRight || top){
                valid = true;
                continue;
            }
        }

        if(valid){
            let number = "";
            for(const numKey of Object.keys(num)){
                const tempNum = coordinateSystem[num[numKey].y][num[numKey].x];
                number += tempNum.toString();
            }

            result += Number(number) ?? 0;
            break;
        }
    }
});

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
