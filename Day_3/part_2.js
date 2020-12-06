"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let fs = require("fs");
let path = require("path");
let { performance } = require("perf_hooks");

const LINES = String(fs.readFileSync(path.join(__dirname, "input.txt"))).split(require("os").EOL);

const pStart = performance.now();

const RESULT = [];
const slopes = [
    [1, 1], 
    [3, 1], 
    [5, 1], 
    [7, 1], 
    [1, 2]
];

/**
 * More modular solution than part one
 *
 * @param {Array} lines
 * @param {*} [slope=[1, 1]]
 * @returns {Number} TREE_COUNT
 */
let countTrees = function(lines, slope = [1, 1]){
    let TREE_COUNT = 0;
    let position = 0;
    
    for (let i = 1; i < lines.length; i++){
        let line = lines[i].trim();

        if (slope[1] === 2 && (i % 2 === 1)) continue;
        
        let moveRight = position + slope[0];
        position = moveRight % line.length;

        let element = line[position];
        if (element === "#") TREE_COUNT += 1;
    }

    return TREE_COUNT;
};

slopes.forEach((element) => RESULT.push(countTrees(LINES, element)));
console.log("TREE COUNT PRODUCT: " + RESULT.reduce((p, c) => p * c));

const pEnd = performance.now();
console.log(pEnd - pStart);
