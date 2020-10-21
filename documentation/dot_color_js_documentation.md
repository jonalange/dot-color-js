# Dot color Js | Documentation
I will start by saying we will never add braking changes to this project. If there is something so spectacular that it needs breaking changes we will make a spin off of the project.
There is a branch named [new ideas](https://github.com/draganradu/dot-color-js/tree/newideas) that contains possible new changes that could get into master soon if they are popular and reliable.
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
[RunKit sandbox](https://npm.runkit.com/dot-color).

# Set color
Because we use setter and getters you can initialize the class with no arguments and then just set the color by assigning a value to the correct key. The colors most be valid for that key, if you do not know what the correct key is just assigned it to the color key and the identify method will take care of it.

```javascript
const dotColor = require("dot-color")

// empty init
const emptyColorObject = new dotColor()
emptyColor.rgb = "rgb 255 0 0"
console.log(emptyColor.html) // red

emptyColorObject.color = "rgb 0 255 0"
console.log(emptyColor.html) // lime

emptyColorObject.cmyk = "rgb 0 0 255"
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
console.log(color.rgbDecimal) //
console.log(color.w) //
console.log(color.xyz) //
console.log(color.yuv) //

```

## Custom Color Format
We looked at built in properties in javascript ( length for exemple ) and we added the same logic to colors. Everyone of the accepted colors has a custom type, it could be object, array, sting, number, boolean. It will have some common props that will make your life easy. 

### hex value
We added this because most applications need to display the value just converted. Some conversions LAB to RAL have some inherit losses, this is a way of showing the a final color. 
```javascript
console.log(color.cmyk.hex) //
```

### clean value (string)
This is just a unified way to display a value, most people are not familiar with JSON looking values and will prefer to have a prettier way of seeing any color.

```javascript
console.log(color.cmyk.clean) //
```

## Utility keys
This are the utility keys, that are related to colors but are not actual convertors or pattern generators. But are left exposed because they are useful for a lot of cases.

#### Format
Format identified when the color was set.
```javascript
console.log(color.format) // "rgb"
// Format | only is updated every time you set a color you set a color

// DO NOT set value.
```


#### sanitizedColor
Returns the sanitized value of the color.
```javascript
console.log(color.sanitizedColor) // {b: 0, g: 0, r: 255} 
// sanitizedColor key | is updated every time you set a color

// DO NOT set this value it will work but it can brake a lot of things.
```

### invert
Returns the exact inverted (complementary) color in the same format as the set color.
```javascript
console.log(color.invert) // {b: 0, g: 255, r: 255}

color.color = 'magenta'
console.log(color.inert) // Lime

// DO NOT set value.
```
### primary
Return the closest primary color. To have a correct primary color we use s: 100, l: 50
```javascript
color.color = "rgb 25 15 8"
console.log(color.primary) //  { r: 255, g: 0, b: 128 }

// DO NOT set value.
```

### secondary
Return the closest primary color. To have a correct primary color we use s: 100, l: 50
```javascript
color.color = "rgb 25 15 8"
console.log(color.primary) //  { r: 255, g: 255, b: 0 }

// DO NOT set value.
```

### tertiary
Return the closest primary color. To have a correct primary color we use s: 100, l: 50
```javascript
color.color = "rgb 25 15 8"
console.log(color.primary) //  { r: 255, g: 128, b: 0 }

// DO NOT set value.
```

## Color Patterns
We have a couple of pattern generator.

### analogous
Analogous returns a pattern of 3 colors with a Hue shifted 30 degrees.
```javascript
console.log(color.analogous) // [ { r: 255, g: 0, b: 128 },{ r: 255, g: 0, b: 0 },{ r: 255, g: 128, b: 0 } ]

color.color = 'DarkMagenta'
console.log(color.inert) // [ 'Indigo', 'Dark Magenta', 'Brown' ]

// DO NOT set value.
```

### complementary 
```javascript
color.color = 'magenta'
console.log(color.complementary) // ['Lime', 'Magenta']

// DO NOT set value.
```


### tones
```javascript


// DO NOT set value.
```

### tints
```javascript

color.color = '#801'
console.log(color.tints) // [ '801', 'A01',  'D01',  'F01',  'F13',  'F45',  'F67',  'F89',  'FBB',  'FDD',  'FFF' ]

// DO NOT set value.
```

### shades
```javascript

color.color = '#801'
console.log(color.tints) // ['000',   '000',  '100',  '200',  '300',  '400',  '500',  '500',  '600',  '700',   '801']

// DO NOT set value.
```


Complementary


## Methods
extract color 
hslSegment


# Common issues
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