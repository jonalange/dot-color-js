# Dot color js

This is a modernized version of [simple-color](https://www.npmjs.com/package/simple-color-converter) it uses modern javascript getters and setters and all sorts of javascript goodness to make one of the lightest but most feature dense color convertors for javascript you can find on NPM.

## How to use
```javascript

const simpleColor = require('dot-color-js');
cosnt color = new simpleColor()

color.cmyk = "cmyk 0 50 60 60"
console.log(color.ral) // {lrv: 5, name: "Red Brown", ral: 8012}

color.rgb = "rgb 10 60 240"
console.log(color.ral) // {lrv: 4, name: "Ultramarine Blue", ral: 5002}


console.log(color.hex3) // "03F"
console.log(color.hex8) // 0A3CF0FF"
console.log(color.rgb) // {b: "240", g: "60", r: "10"}
console.log(color.cmyk) // {c: 96, k: 6, m: 75, y: 0}

```

## Format identification from string
The main thing we do better then any other color convertor is the ability to get any string and figure out is there is a color berried in there.

[Accepted colors input test](exemple_color.md)

## Ambiguous Color
We do not have a lot of ambiguous situations but we want to document all of them.

Pantone (shorthand) VS hex3 (shorthand)
*100C* -> is hex3
100C could be Pantone 100C or #100C. in this case it is more likely to be hex3 so we decided for the hex as long as there is no pantone key.

CMYK (shorthand) VS any 4 group shorthand.
10 30 40 10 -> is CMYK 
In this case this is a default any group of 4 as long as they are valid cmyk and there is no other indicators is default cmyk

RGB (shorthand) VS any 3 group shorthand.
10 30 40 -> is RGB
In this case this is a default any group of 3 as long as they are valid rgb and there is no other indicators is default rgb

grayscale (shorthand) VS any 1 group shorthand.
10 -> is grayscale
In this case this is a default any group of 1 as long as they are 0 - 100 and there is no other indicators is default grayscale
