

const colorAbstract = require('../dot-color')

const color = new colorAbstract('ral 1000')
console.log(color.analogous) 

/*

[ { ral: 1006, name: 'Maize Yellow', lrv: 36 },
  { ral: 1000, name: 'Green Beige', lrv: 50 },
  { ral: 6019, name: 'Pastel Green', lrv: 57 } ]

*/


