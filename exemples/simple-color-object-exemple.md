# Lets start
We will never add braking changes to this project. If there is something so spectacular that it needs bracking changes we will make a spinof of the project.


## how to install
As long as your project runs NPM its as simple as installing the project

## how to init
First you need to requier the package then init the class as any other class.
You can init it empty and the set a new color or declare a color from the start.

```javascript
const simpleColor = require('simple_color_object');

// init with color
const redColor = new simpleColor("rgb 255 0 0")
console.log(redColor.html) // red

// empty init
const emptyColorObject = new simpleColor()
emptyColor.rgb("rgb 255 0 0")
console.log(emptyColor.html) // red




```

# how to set color
Because we use setter and getters for allthe html 