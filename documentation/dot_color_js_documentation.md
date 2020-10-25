# Dot color Js | Documentation
I will start by saying we will never add breaking changes to this project. If there is something so spectacular that it needs breaking changes we will make a spin off of the project.
There is a branch named [new ideas](https://github.com/draganradu/dot-color-js/tree/newideas) that contains possible new changes that could get into master soon if they are popular and reliable.
This documentation will evolve if we add some new features but we will not have anything deprecated, ever.

[The official demo is here.](http://fotodex.ro/)

## 0 | Install
```javascript
$ npm install dot-color-js
```

## 1 | Initialize 
First, you need to require the package, then into the class as any other JavaScript class.

```javascript
// require dot color
const dotColor = require("dot-color")

// init with color
const redColor = new dotColor("rgb 255 0 0")
console.log(redColor.html) // red

```
[RunKit sandbox](https://npm.runkit.com/dot-color).

## 2 | Set color
Because we use setter and getters you can initialize the class with no arguments and then just set the color by assigning a value to the correct key. The colors must be valid for that key, if you do not know what the correct key is, just assigned it to the **color** key and the identify method will take care of it.

```javascript
// init
const dotColor = require("dot-color")

// empty init
const emptyColorObject = new dotColor()
emptyColorObject.rgb = "rgb 255 0 0"
console.log(emptyColorObject.html) // red

// init with color
const colorObject = new dotColor("rgb 255 0 0")
console.log(colorObject.html) // red
```

##### 2.1 | Set color string format sanitizer
We worked hard to make the identify method identify almost any color buried deep inside a string, as a user would type in a search bar. Most people look at the diversity of the inputs examples and think this is overkill, but most user introduce data in a way that is easy for them, not us the data sanitizers. [exemple of tested data](https://github.com/draganradu/dot-color-js/blob/master/exemple_color.md) 

```javascript
const colorObject = new dotColor()

colorObject.color = "cmyk 10 20 50 6"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}


colorObject.color = "cMyk 10 20 50 6"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}

colorObject.color = "10 20 50 6"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}

colorObject.color = "10 20 50 6 cmyk"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}

colorObject.color = "c: 10 m:20 y:50 k:6"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}

colorObject.color = "m:20 k:6 c: 10 y:50"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}

colorObject.color = "cmyk=39,0,39,7"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}

colorObject.color = "cmyk(39 0 39 7)"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}

colorObject.color = "cmyk(39,0,39,7)"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}

colorObject.color = "cmyk(39/0/39/7)"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}

colorObject.color = "cmyk(39;0;39;7)"
console.log(colorObject.cmyk) //{c: 10, m: 20, y:50, k: 6}
```

## 3 | Change color
You can change the color at any time by setting a value to the color key or directly by assigning a value to any of the color keys (see accepted colors). 

```javascript
// init
const dotColor = require("dot-color")


// init with color
const colorObject = new dotColor("rgb 255 0 0")
console.log(colorObject.html) // red

// exact key
colorObject.html = 'yellow'
console.log(colorObject.rgb) // {r: 249 g: 215 b: 28}

// if you use the exact key than the color should be valid for that specific key
colorObject.html = 'cmyk 50 20 10 5'
console.log(colorObject.rgb) // false


// the color key has a setter behind that identified and extracts the color
colorObject.color = 'cmyk 50 20 10 5'
console.log(colorObject.rgb) // {r: 121, g: 194, b: 218 }

```

## 4 | Accepted Colors
All the colors are in a **setter - getter** key pair. The value set to a key will be identified, tested an the value will be sanitized.

```javascript
const dotColor = require("dot-color")
const color = new dotColor("rgb 255 0 0")

console.log(color.cmyk) // {c: 0, k: 0, m: 100, y: 100}
console.log(color.grayscale) // 70
console.log(color.hex3) // "F00"
console.log(color.hex4) // "F00F"
console.log(color.hex6) // "FF0000"
console.log(color.hex8) // "FF0000FF"
console.log(color.html) // "Red" 
console.log(color.hsl) // {h: 0, l: 50, s: 100}
console.log(color.hsv) // {h: 0, s: 100, v: 100}
console.log(color.lab) // {a: 80.10930952982204, b: 67.22006831026425, l: 53.23288178584245}
console.log(color.pantone) // "172C"
console.log(color.ral) // {lrv: 30, name: "Luminous Red", ral: 3024}
console.log(color.rgb) // {b: 0, g: 0, r: 255}
console.log(color.rgba) // {a: 1, b: 0, g: 0, r: 255}
console.log(color.rgbDecimal) //
console.log(color.w) // 620
console.log(color.xyz) // {x: 41.24, y: 21.26, z: 1.9300000000000002}
console.log(color.yuv) // {u: 90.26, v: 239.945, y: 81.535}

```

If you want the accepted colors you have access to this key.

```javascript
console.log(color.acceptedColors.keys) // [ 'cmyk',  'grayscale',  'hex3',  'hex4',  'hex6',  'hex8',  'html',  'hsl',  'hsv',  'lab',  'pantone',  'ral',  'rgb',  'rgba',  'rgbDecimal',  'w',  'xyz',  'yuv' ]

// DO NOT set value.
```

## 5 | Custom Color Format
We looked at built-in properties in JavaScript ( length for exemple ) and we added the same logic to colors. Everyone of the accepted colors has a custom type, it could be object, array, sting, number, boolean. It will have some common props that will make your life easy. 

##### 5.1 | hex value
We added this because most applications need to display the value just converted. Some conversions LAB to RAL have some inherit losses, this is a way of showing the a final color. 

```javascript
console.log(color.cmyk.hex) // '#FF0000'
```

##### 5.2 | clean value (string)
This is just a unified way to display a value, most people are not familiar with JSON looking values and will prefer to have a prettier way of seeing any color.

```javascript
console.log(color.cmyk.clean) // 'cmyk(0, 100, 100, 0)'
```

##### 5.3 | mono
(soon the method is not finished yet, will be present in future versions)

## 6 | Utility keys
This are the utility keys, that are related to colors but are not actual convertors or pattern generators. But are left exposed because they are useful for a lot of cases.
(final documentation coming soon)

##### 6.1 | Format
Format identified when the color was set.
```javascript
console.log(color.format) // "rgb"
// Format | only is updated every time you set a color you set a color

// DO NOT set value.
```

##### 6.2 | sanitizedColor
Returns the sanitized value of the color set.
```javascript
console.log(color.sanitizedColor) // {b: 0, g: 0, r: 255} 
// sanitizedColor key | is updated every time you set a color

// DO NOT set this value.
```

## 7 | Logical Conversion
This are any conversion that will return a color in the same format but with a diferent walue

##### 7.1 | Invert color
Returns the exact inverted (complementary) color in the same format as the set color.
```javascript
console.log(color.invert) // {b: 0, g: 255, r: 255}

color.color = 'magenta'
console.log(color.inert) // Lime

// DO NOT set value.
```
##### 7.2 | Primary color (neerast)
Return the closest primary color. To have a correct primary color we use s: 100, l: 50 to convert.
```javascript
color.color = "rgb 25 15 8"
console.log(color.primary) //  { r: 255, g: 0, b: 128 }

// DO NOT set value.
```

##### 7.3 | Secondary color (neerast)
Return the closest secondary color. To have a correct secondary color we use s: 100, l: 50 to convert.
```javascript
color.color = "rgb 25 15 8"
console.log(color.secondary) //  { r: 255, g: 255, b: 0 }

// DO NOT set value.
```

##### 7.4 | Tertiary color (neerast)
Return the closest tertiary color. To have a correct tertiary color we use s: 100, l: 50 to convert.
```javascript
color.color = "rgb 25 15 8"
console.log(color.tertiary) //  { r: 255, g: 128, b: 0 }

// DO NOT set value.
```

## 8 | Color Patterns
We have a couple of pattern generator. we will add more in a future and way to determine how colors are related.

##### 8.1 | Analogous color pattern
Analogous returns a pattern of 3 colors with a Hue shifted 30 degrees.
```javascript
color.color = "rgb 255 0 0"
console.log(color.analogous) // [ { r: 255, g: 0, b: 128 },{ r: 255, g: 0, b: 0 },{ r: 255, g: 128, b: 0 } ]

// DO NOT set value.
```

##### 8.2 | Complementary color pattern 
Complementary color pattern, current sanitized color and the invert color as an array.
```javascript
color.color = 'magenta'
console.log(color.complementary) // ['Lime', 'Magenta']

// DO NOT set value.
```


##### 8.3 | Tones color pattern
**will be present in a future version the current one has some issues**
A 11 element array where element 5 is the sanitized color 0-4 are shades 6-10 are tints
```javascript
color.color = '123'
console.log(color.tones) // [ '000',  '012',  '134',  '247',  '369',  '48B',  '69C',  '8BD',  'BCE',  'DEF',  'FFF' ]

// DO NOT set value.
```

##### 8.4 | Tints color pattern
10 values from formatted color to white
```javascript
color.color = '123'
console.log(color.tints) // [ '000',  '012',  '134',  '247',  '369',  '48B',  '69C',  '8BD',  'BCE',  'DEF',  'FFF' ]

// DO NOT set value.
```

##### 8.5 | shades color pattern
10 values from formatted color to black
```javascript
color.color = '123'
console.log(color.shades) // [ '000',  '000',  '000',  '000',  '001',  '011',  '011',  '012',  '012',  '012',  '123' ]

// DO NOT set value.
```


## 9 | Methods
##### 9.1 | extract color 
Method used to identify and set the formatted color.
```javascript
color.extractColor('123')
console.log(color) // { format: 'hex3', sanitizedColor: '123' }

// DO NOT set value.
```
##### 9.2 | compare
(soon the method is not finished yet, will be present in future versions)

##### 9.2 | info
(soon the method is not finished yet, will be present in future versions)

## 10 | Ambiguous Color
We do not have a lot of ambiguous situations, we try to reduce them as possible, but due to the nature of string interpretation we have to default some time to a color.We want to be diligent and document all of the ambiguous colors that could cause colors.

##### Pantone (shorthand) VS hex3 (shorthand)
**100C** is hex3
100C could be Pantone 100C or #100C. In this case it is more likely to be hex3 so we decided for the hex as long as there is no pantone key in the string.

##### Grayscale 100 VS hex3 (no hash) 100
**100** is grayscale
100 could be Pantone 100C or hex #100 or grayscale 100. In this case we go to grayscale because it would completely exclude grayscale 100% 

##### CMYK (shorthand) VS any 4 group shorthand.
**10 30 40 10** is CMYK 
We default any group of 4 to CMYK if there is no indication (keys) that it would be any other.

##### RGB (shorthand) VS any 3 group shorthand.
**10 30 40** is RGB
We default any group of 4 to RGB if there is no indication (keys) that it would be any other.

##### grayscale (shorthand) VS any 1 group shorthand.
**10** is grayscale
We default any group of 1 to grayscale if there is no indication (keys) that it would be any other.

##### hex3 VS html.
**black, Antique White, etc** is html
There are 61 html colors that contain a hex valid pattern /[0-9a-f]{2}){4}|[0-9a-f]{2}){3}|([0-9a-f]){4}|([0-9a-f]){3}/gi in order to fix this any string that contains (?![hxo])[g-z] pattern will be excluded from being valid hex.


## 11 | Common issues
Setting wrong format.
```javascript
const simpleColor = require('simple_color_object');

// if you set the color to
const emptyColorObject = new simpleColor()
emptyColor.cmyk = "rgb 255 0 0"
console.log(emptyColor.html) // false

// simplest fix but using the .color setter instead of .rgb key runs the identify method. Only use the specific setter if you know that the color you want to set is the correct format.
emptyColor.color = "rgb 255 0 0"
console.log(emptyColor.html) // rgb

```