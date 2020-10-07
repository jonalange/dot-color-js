'use strict'
const sanitize = require('./components/sanitization')
const identify = require('./components/identify')
const convertColor = require('./components/convert_color')
const colorScaffolding = require('./components/colorScaffolding')

// ----------------------------- 0 | object color
class AbstractColorObject {
    constructor (data, colotType) {
        Object.assign(this, data)
        if(colotType) {
            Object.defineProperty(this, "colotType", {
                enumerable: false,
                writable: true,
                value: colotType
            });
        }
    }

    get hex () {
        return convertColor.convert({
            from: this.colotType,
            to: 'hex6',
            color: this,
            pretty: true,
        })
    }

    get clean () {
        let keys = Object.keys(this).join('')
        let values = Object.values(this).map(x => Math.round(x*100)/100 ).join(', ')
        return `${keys}(${values})`
    }
}

class AbstractColorRAL extends AbstractColorObject{
    constructor (data, colotType) {
        super(data)
    }

    get hex () {
        return convertColor.convert({
            from: 'ral',
            to: 'hex6',
            color: this.ral.toString(),
            pretty: true,
        })
    }

    get clean () {
        const { ral } = this
        return `RAL ${ral}`
    }
}

// ----------------------------- 1 | string color
class AbstractColorString extends String{
    constructor (data, colotType) {
        super(data)
        if(colotType) {
            Object.defineProperty(this, "colotType", {
                enumerable: false,
                writable: true,
                value: colotType
            });
        }
    }

    get hex () {
        return convertColor.convert({
            from: this.colotType,
            to: 'hex6',
            color: this.toString(),
            pretty: true,
        })
    }

    get clean () {
        let _this = this.toString().replace(/([A-Z])/g, ' $1').replace(/ {2}|   {2}/g,' ').trim()
        return _this.charAt(0).toUpperCase() + _this.slice(1)
    }
}

class AbstractColorHTML extends AbstractColorString{
    constructor (data, colotType) {
        super(data)
    }

    get hex () {
        return convertColor.convert({
            from: 'html',
            to: 'hex6',
            color: this.toString(),
            pretty: true,
        })
    }
}

class AbstractColorHex extends AbstractColorString{
    constructor (data, colotType) {
        super(data)
    }

    get hex () {
        return convertColor.convert({
            from: 'hex' + this.length,
            to: 'hex6',
            color: this.toString(),
            pretty: true,
        })
    }

    get clean () {
        return `#${this}`
    }
}

// ----------------------------- 2 | numeric color
class AbstractColorNumber extends Number {
    constructor (data, colotType) {
        super(data)
    }
}

class AbstractColorPantone extends AbstractColorNumber{
    constructor (data, colotType) {
        super(data)
    }

    get hex () {
        return convertColor.convert({
            from: 'pantone',
            to: 'hex6',
            color: this.toString(),
            pretty: true,
        })
    }

    get clean () {
        return `Pantone ${this}`
    }
}

class AbstractColorGrayscale extends AbstractColorNumber{
    constructor (data, colotType) {
        super(data)
    }

    get hex () {
        return convertColor.convert({
            from: 'grayscale',
            to: 'hex6',
            color: this,
            pretty: true,
        })
    }

    get clean () {
        return `Grayscale: ${this}`
    }
}


// ----------------------------- A | Object Class
class objectiveColor {
    constructor(inputColor) {
        this.init()
        this.colorExtractor(inputColor)
    }

    colorExtractor(inputColor, setFormat) {
        delete this.format
        delete this.sanitizedColor
        if (inputColor) {
            this.format = (setFormat) ? ((identify(inputColor, setFormat)) ? setFormat : false) : identify(inputColor)
            
            if (this.format) {
                this.sanitizedColor = sanitize(inputColor, this.format)
            } else {
                this.format = false
                this.sanitizedColor = false
            }
        }
    }

    init() {
        for (const aColor of this.acceptedColors.keys) {
            Object.defineProperty(this, aColor, {
                get() {
                    let tempColor = false
                    let _this = this

                    if (this.format === aColor) {
                        tempColor = this.sanitizedColor
                    } else if (this.format) {
                        tempColor = convertColor.convert({
                            from: this.format,
                            to: aColor,
                            color: this.sanitizedColor,
                        })
                    }

                    if(typeof tempColor === 'string') {
                        if ( aColor === 'html' ){
                            return new AbstractColorHTML(tempColor,aColor)
                        } else if (aColor.indexOf('hex') > -1 ){
                            return new AbstractColorHex(tempColor, aColor)
                        }
                        return new AbstractColorString(tempColor, aColor)
                    } else if (typeof tempColor === 'number'){
                        if( aColor === 'pantone') {
                            return new AbstractColorPantone(tempColor, aColor)
                        } else if (aColor === 'grayscale'){
                            return new AbstractColorGrayscale(tempColor, aColor)
                        }
                    } else if (typeof tempColor === 'object') {
                        if (aColor === 'ral') {

                            return new AbstractColorRAL(tempColor, aColor)
                        } 
                        return new AbstractColorObject(tempColor, aColor)
                    } else {
                        return tempColor
                    }
                   
                },
                set(input) {
                    this.colorExtractor(input, aColor)
                }
            })
        }

        Object.defineProperty(this, 'color', {
            get() {
                return this.sanitizedColor
            },
            set(input) {
                this.colorExtractor(input)
            }
        })

        // Object.defineProperty(this, 'htmlref', {
        //     get() {
        //         const stepsToConvert = convertColor.stepsToConvert("html", "hex6")
        //         let tempColor = this.clone(this.html);
        //         if (stepsToConvert) {
        //             for (let i = 0; i < stepsToConvert.length - 1; i++) {
        //                 if (tempColor, aColor) {
        //                     tempColor = convertColor[stepsToConvert[i]][stepsToConvert[i + 1]](this.clone(tempColor, aColor))
        //                 }
        //             }
        //         }
        //         return (tempColor, aColor) ? "#" + tempColor : false
        //     }
        // })
    }
}

Object.assign(objectiveColor.prototype, colorScaffolding);

module.exports = objectiveColor