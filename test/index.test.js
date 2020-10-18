
const objectiveColor = require('../dot-color')
const testData = require('./test.data')
const testRulez = require('./test.rulez')

const colorTest = new objectiveColor()

testRulez.buildTableHead()

for (const elementColor of testData) {

    if (typeof elementColor[0] === 'string') {
        // set color
        colorTest.colorExtractor(elementColor[0])
        // read

        let testPased = true
        for (const testValue in elementColor[1]) {
            // convert data to a die cast model
            if (typeof elementColor[1][testValue] === 'object') {
                var die = Object.entries(elementColor[1][testValue]).sort().toString()
                var cast = Object.entries(colorTest[testValue]).sort().toString()
            } else {
                var die = elementColor[1][testValue]
                var cast = colorTest[testValue]
            }

            // see if the testing is correct
            if (die === cast || die === cast.toString(2)) {
                testRulez.addline([elementColor[0], testValue + ": " + die])
            } else {
                testPased = false
                console.log('faild on:' + (testRulez.statistics.totalTests + 2), die, cast ,'---------------------------------------')
            }
        }

        if (testPased) {
            testRulez.statistics.succesfull++;
        } else {
            testRulez.statistics.faild++;
        }
    }
}

console.log(testRulez.statistics)
testRulez.writeFile()
