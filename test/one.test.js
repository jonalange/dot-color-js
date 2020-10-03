const colorAbstract = require('../dot-color')

// const color = new colorAbstract('#123')
const color = new colorAbstract('296C')
let t = 'cmyk'



t = 'hsl'
t = 'grayscale'
t = 'hex3'
t = 'hex4'
t = 'hex6'
t = 'html'
t = 'hsl'
t = 'hsv'
t = 'lab'
t = 'pantone'

console.log('---------------------------------',t)
console.log(color)
console.log(color[t])
console.log(color[t].hex)
console.log(color[t].clean)

// // html color test
// const { html } = require('color_library')
// let list = ''

// for (const a of html ){
//     color.color = a.name
//     if(color.format !== 'html'){
//         list += a.name.toLowerCase()
//     }
// }

// const listArray =  [...new Set(list.replace(/[a-f]/gi,'').split(''))]

// console.log(listArray)


