"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n"); // change this if necessary

const pStart = performance.now();

const data = {};

for(let i = 0; i < INPUT.length; i++){
    const line = INPUT[i];
    if(line.startsWith("seeds:")){
        const seeds = line.split(":");
        data.seeds = seeds[1].split(" ").filter(seed => seed !== "").map(seed => Number(seed));
    }
    else if(line.startsWith("seed-to-soil")){
        data.seedSoil = [];
        for(let j = i + 1; j < INPUT.length; j++){
            const tempLine = INPUT[j];
            if(isNaN(Number(tempLine.split("")[0]))) break;
            data.seedSoil.push(tempLine.split(" ").map(value => Number(value)));
        }
    }
    else if(line.startsWith("soil-to-fertilizer")){
        data.soilFertilizer = [];
        for(let j = i + 1; j < INPUT.length; j++){
            const tempLine = INPUT[j];
            if(isNaN(Number(tempLine.split("")[0]))) break;
            data.soilFertilizer.push(tempLine.split(" ").map(value => Number(value)));
        }
    }
    else if(line.startsWith("fertilizer-to-water")){
        data.fertilizerWater = [];
        for(let j = i + 1; j < INPUT.length; j++){
            const tempLine = INPUT[j];
            if(isNaN(Number(tempLine.split("")[0]))) break;
            data.fertilizerWater.push(tempLine.split(" ").map(value => Number(value)));
        }
    }
    else if(line.startsWith("water-to-light")){
        data.waterLight = [];
        for(let j = i + 1; j < INPUT.length; j++){
            const tempLine = INPUT[j];
            if(isNaN(Number(tempLine.split("")[0]))) break;
            data.waterLight.push(tempLine.split(" ").map(value => Number(value)));
        }
    }
    else if(line.startsWith("light-to-temperature")){
        data.lightTemp = [];
        for(let j = i + 1; j < INPUT.length; j++){
            const tempLine = INPUT[j];
            if(isNaN(Number(tempLine.split("")[0]))) break;
            data.lightTemp.push(tempLine.split(" ").map(value => Number(value)));
        }
    }
    else if(line.startsWith("temperature-to-humidity")){
        data.tempHumidity = [];
        for(let j = i + 1; j < INPUT.length; j++){
            const tempLine = INPUT[j];
            if(isNaN(Number(tempLine.split("")[0]))) break;
            data.tempHumidity.push(tempLine.split(" ").map(value => Number(value)));
        }
    }
    else if(line.startsWith("humidity-to-location")){
        data.humidityLocation = [];
        for(let j = i + 1; j < INPUT.length; j++){
            const tempLine = INPUT[j];
            if(isNaN(Number(tempLine.split("")[0]))) break;
            data.humidityLocation.push(tempLine.split(" ").map(value => Number(value)));
        }
    }
}

const convert = (dataArr, dataRatio) => {
    const usedData = [];
    const ratio = dataRatio;
    const resultData = [];
    for(const d of dataArr){
        for(const rat of ratio){
            const destinationStart = rat[0];
            const sourceStart = rat[1];
            const step = rat[2];

            if(d > sourceStart && d < sourceStart + step){
                const difference = d - sourceStart;
                resultData.push(destinationStart + difference);
                usedData.push(d);
            }
            else{
                if(!resultData.includes(d)){
                    resultData.push(d);
                }
            }
        }
    }
    return resultData.filter(val => !usedData.includes(val));
};

const seedToSoil = convert(data.seeds, data.seedSoil);
const soilToFert = convert(seedToSoil, data.soilFertilizer);
const fertToWater = convert(soilToFert, data.fertilizerWater);
const waterToLight = convert(fertToWater, data.waterLight);
const lightToTemp = convert(waterToLight, data.lightTemp);
const tempToHumidity = convert(lightToTemp, data.tempHumidity);
const humidityToLocation = convert(tempToHumidity, data.humidityLocation);

const result = Math.min(...humidityToLocation);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
