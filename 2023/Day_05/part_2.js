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
        const seedsStr = line.split(":");
        data.seeds = seedsStr[1].split(" ").filter(seed => seed !== "").map(val => Number(val));
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

const convert = (d, dataRatio) => {
    for(const rat of dataRatio){
        const destinationStart = rat[0];
        const sourceStart = rat[1];
        const step = rat[2];

        if(d >= sourceStart && d <= sourceStart + step) return destinationStart + (d - sourceStart);
    }

    return d;
};

let minimum = -1;

for(let j = 0; j < data.seeds.length; j += 2){
    const start = data.seeds[j];
    const steps = data.seeds[j + 1];
    for(let k = start; k < start + steps; k++){
        const seedToSoil = convert(k, data.seedSoil);
        const soilToFert = convert(seedToSoil, data.soilFertilizer);
        const fertToWater = convert(soilToFert, data.fertilizerWater);
        const waterToLight = convert(fertToWater, data.waterLight);
        const lightToTemp = convert(waterToLight, data.lightTemp);
        const tempToHumidity = convert(lightToTemp, data.tempHumidity);
        const converted = convert(tempToHumidity, data.humidityLocation);
        if(minimum === -1 || converted < minimum) minimum = converted;
    }
}

const result = minimum;

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
