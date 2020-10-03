# Dot color Js | Documentation
I will start by saying we will never add braking changes to this project. If there is something so spectacular that it needs breaking changes we will make a spin off of the project.
This documentation will evolve if we add some new features but we will not have anything deprecated, ever.

[The official demo is here.](http://fotodex.ro/)

## Install
```javascript
$ npm install dot-color-js
```

## Initialize 
First, you need to require the package, then into the class as any other JavaScript class.

```javascript
const dotColor = require("dot-color")

// init with color
const redColor = new dotColor("rgb 255 0 0")
console.log(redColor.html) // red

```

# Set color
Because we use setter and getters you can initialize the class with no arguments and then just set the color by assigning a value to the correct key. The colors most be valid for that key, if you do not know what the correct key is just assigned it to the color key and the identify method will take care of it.

```javascript
const dotColor = require("dot-color")

// empty init
const emptyColorObject = new dotColor()
emptyColor.rgb = "rgb 255 0 0"
console.log(emptyColor.html) // red

empltyColor.color = "rgb 0 255 0"
console.log(emptyColor.html) // lime

empltyColor.cmyk = "rgb 0 0 255"
console.log(emptyColor.html) // false
```

# Object keys
## Accepted Colors
All the colors are in a setter - getter key pair. The value set to a key will be identified, tested an the value will be sanitized.

```javascript
const dotColor = require("dot-color")
const color = new dotColor("rgb 255 0 0")

console.log(color.cmyk) //
console.log(color.grayscale) //
console.log(color.hex3) //
console.log(color.hex4) //
console.log(color.hex6) //
console.log(color.hex8) //
console.log(color.html) //
console.log(color.hsl) //
console.log(color.hsv) //
console.log(color.lab) //
console.log(color.pantone) //
console.log(color.ral) //
console.log(color.rgb) //
console.log(color.rgba) //
console.log(color.rgbdecimal) //
console.log(color.w) //
console.log(color.xyz) //
console.log(color.yuv) //

```

## Utility keys

```javascript
const dotColor = require("dot-color")
const color = new dotColor("rgb 255 0 0")

console.log(color.format) // "rgb"
// Format | only is updated every time you set a color

console.log(color.sanitizedColor) // {b: 0, g: 0, r: 255} 
// sanitizedColor key | only is updated every time you set a color 

console.log(color.htmlref) // #ff0000 - will be modified
// htmlref | the hex value of the html equivalent color. We use it for testing, do not use it

```
## Methods



# Common issues
Setting wrong format.
```javascript
const simpleColor = require('simple_color_object');

// if you set the color to
const emptyColorObject = new simpleColor()
emptyColor.cmyk = "rgb 255 0 0"
console.log(emptyColor.html) // false

// simplest fix but using the .color setter instead of .rgb key runs the identify method.
emptyColor.color = "rgb 255 0 0"
console.log(emptyColor.html) // rgb

```