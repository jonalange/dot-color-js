const colorAbstract = require('../dot-color')

const color = new colorAbstract('green')

// color.color = 'rgb 0 255 0'

console.log(color)

// color.color = '#000'

// console.log(color)

// color.format = 'rgb'

// console.log(color)


// html color test
const { html } = require('color_library')
let list = ''

for (const a of html ){
    color.color = a.name
    if(color.format !== 'html'){
        list += a.name.toLowerCase()
    }
}

const listArray =  [...new Set(list.replace(/[a-f]/gi,'').split(''))]

console.log(listArray)


