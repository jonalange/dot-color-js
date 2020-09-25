# Lets start
We will never add braking changes to this project. If there is something so spectacular that it needs bracking changes we will make a spinof of the project.


## install
As long as your project runs NPM its as simple as installing the project
```javascript
$ npm install dot-color-js
```

## Initialize
First you need to requier the package then init the class as any other javascript class.
You can init it empty and the set a new color or declare a color from the start. Because we are using getters and setters it dose not matter.

```javascript
const simpleColor = require('simple_color_object');

// init with color
const redColor = new simpleColor("rgb 255 0 0")
console.log(redColor.html) // red

```

# Set color
Because we use setter and getters you can init the class with no arguments and then just set the color to any color. The colors most be valid for that key.

```javascript
const simpleColor = require('simple_color_object');

// empty init
const emptyColorObject = new simpleColor()
emptyColor.rgb = "rgb 255 0 0"
console.log(emptyColor.html) // red

empltyColor.color = "rgb 0 255 0"
console.log(emptyColor.html) // red


```

How to set a color that you do not know the format, or may not be valid for that key.

```javascript
const simpleColor = require('simple_color_object');

// if you set the color to
const emptyColorObject = new simpleColor()
emptyColor.color = "rgb 255 0 0"
console.log(emptyColor.html) // red

```

# Common 
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