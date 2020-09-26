const colorAbstract = require('../dot-color')

const color = new colorAbstract('rgb 0 255 0')

// color.color = 'rgb 0 255 0'

console.log(color)

color.color = '#000'

console.log(color)

color.format = 'rgb'

console.log(color)
